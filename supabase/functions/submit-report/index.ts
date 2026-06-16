// Edge function: submit-report
// The single, server-side entry point for creating corruption reports.
//
// Why this exists: the `reports` table no longer grants INSERT to anon/authenticated
// (see migration). All writes go through here, where we can validate input and
// rate-limit by IP using the service role (which bypasses RLS). This closes the
// "open anonymous write endpoint" gap — clients can no longer spam the table
// directly with the public anon key.
//
// Deploy with: `supabase functions deploy submit-report` (Lovable does this on sync).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const CATEGORIES = ['bribe', 'ghost_project', 'missing_funds', 'harassment', 'red_tape', 'other'];

// Rate limits (per hashed IP).
const SHORT_WINDOW_SECONDS = 60; // burst guard
const SHORT_WINDOW_MAX = 1;
const LONG_WINDOW_SECONDS = 3600; // sustained guard
const LONG_WINDOW_MAX = 10;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function hashIp(ip: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function clampOptional(value: unknown, max: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  const s = String(value).trim();
  if (!s) return null;
  return s.length > max ? s.slice(0, max) : s;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // Honeypot: a hidden field only bots fill in. Pretend success, save nothing.
  if (payload.honey) return json({ ok: true });

  // --- Validation (mirrors the client-side zod schema and the DB CHECK constraints) ---
  const errors: string[] = [];

  const category = String(payload.category ?? '');
  if (!CATEGORIES.includes(category)) errors.push('Invalid category.');

  const description = typeof payload.description === 'string' ? payload.description.trim() : '';
  if (description.length < 10 || description.length > 2000) {
    errors.push('Description must be between 10 and 2000 characters.');
  }

  const lat = Number(payload.lat);
  const lng = Number(payload.lng);
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) errors.push('Invalid latitude.');
  if (!Number.isFinite(lng) || lng < -180 || lng > 180) errors.push('Invalid longitude.');

  const state = clampOptional(payload.state, 80);
  const city = clampOptional(payload.city, 80);
  const office_name = clampOptional(payload.office_name, 160);

  let amount: number | null = null;
  if (payload.amount !== undefined && payload.amount !== null && payload.amount !== '') {
    const n = Number(payload.amount);
    if (!Number.isFinite(n) || n < 0 || n > 1e12) errors.push('Invalid amount.');
    else amount = n;
  }

  if (errors.length) return json({ error: errors[0], errors }, 422);

  // --- Service-role client (bypasses RLS) ---
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) return json({ error: 'Server not configured.' }, 500);

  const admin = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // --- Rate limit by hashed IP (raw IP is never stored) ---
  const forwarded = req.headers.get('x-forwarded-for') ?? '';
  const ip = forwarded.split(',')[0].trim() || 'unknown';
  const salt = Deno.env.get('RATE_LIMIT_SALT') ?? serviceKey;
  const ipHash = await hashIp(ip, salt);

  const longCutoff = new Date(Date.now() - LONG_WINDOW_SECONDS * 1000).toISOString();
  const { data: recent, error: rlError } = await admin
    .from('report_rate_limit')
    .select('created_at')
    .eq('ip_hash', ipHash)
    .gte('created_at', longCutoff);

  if (rlError) {
    // Fail open on ledger errors so genuine reporters are never blocked by infra hiccups.
    console.error('rate-limit read failed', rlError);
  } else {
    const now = Date.now();
    const burst = recent.filter(
      (r) => now - new Date(r.created_at as string).getTime() <= SHORT_WINDOW_SECONDS * 1000
    ).length;
    if (burst >= SHORT_WINDOW_MAX) {
      return json({ error: "You're reporting too fast. Wait a minute and try again." }, 429);
    }
    if (recent.length >= LONG_WINDOW_MAX) {
      return json({ error: 'Hourly report limit reached. Please try again later.' }, 429);
    }
  }

  await admin.from('report_rate_limit').insert({ ip_hash: ipHash });

  // --- Persist the report ---
  const { data, error } = await admin
    .from('reports')
    .insert({ lat, lng, category, description, state, city, office_name, amount, status: 'approved' })
    .select()
    .single();

  if (error) {
    console.error('report insert failed', error);
    return json({ error: 'Could not save your report. Please try again.' }, 500);
  }

  return json({ ok: true, report: data }, 201);
});
