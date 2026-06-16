import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Default marker icon fix for leaflet + bundlers
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const CATEGORIES = [
  { value: 'bribe', label: '💰 Bribe demanded' },
  { value: 'ghost_project', label: '👻 Ghost project / no work' },
  { value: 'missing_funds', label: '🕳️ Missing funds' },
  { value: 'harassment', label: '⚠️ Harassment / threats' },
  { value: 'red_tape', label: '📜 Red tape / extortion' },
  { value: 'other', label: '🎪 Other' },
] as const;

type Category = (typeof CATEGORIES)[number]['value'];

const reportSchema = z.object({
  category: z.enum(['bribe', 'ghost_project', 'missing_funds', 'harassment', 'red_tape', 'other']),
  state: z.string().trim().max(80).optional(),
  city: z.string().trim().max(80).optional(),
  office_name: z.string().trim().max(160).optional(),
  description: z.string().trim().min(10, 'At least 10 characters').max(2000),
  amount: z.number().nonnegative().max(1e12).optional(),
});

interface ReportRow {
  id: string;
  lat: number;
  lng: number;
  state: string | null;
  city: string | null;
  office_name: string | null;
  category: string;
  description: string;
  amount: number | null;
  upvotes: number;
  created_at: string;
  status?: string;
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function ReportPage() {
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [pickedPos, setPickedPos] = useState<{ lat: number; lng: number } | null>(null);
  const [form, setForm] = useState<{
    category: Category;
    state: string;
    city: string;
    office_name: string;
    description: string;
    amount: string;
    honey: string;
  }>({
    category: 'bribe',
    state: '', city: '', office_name: '', description: '', amount: '',
    honey: '', // honeypot
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase
      .from('reports')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(500)
      .then(({ data }) => {
        if (mounted && data) setReports(data as ReportRow[]);
      });

    const channel = supabase
      .channel('reports-map')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reports' }, (payload) => {
        const r = payload.new as ReportRow;
        if (r.status === 'approved' && mounted) setReports(prev => [r, ...prev]);
      })
      .subscribe();
    return () => { mounted = false; supabase.removeChannel(channel); };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickedPos) {
      toast.error('Click on the map to drop a pin first.');
      return;
    }
    if (form.honey) return; // bot

    const parsed = reportSchema.safeParse({
      category: form.category,
      state: form.state || undefined,
      city: form.city || undefined,
      office_name: form.office_name || undefined,
      description: form.description,
      amount: form.amount ? Number(form.amount) : undefined,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    // Submissions go through the rate-limited `submit-report` edge function —
    // direct inserts into the table are no longer permitted (see migration).
    const { error } = await supabase.functions.invoke('submit-report', {
      body: {
        lat: pickedPos.lat,
        lng: pickedPos.lng,
        category: parsed.data.category,
        description: parsed.data.description,
        state: parsed.data.state,
        city: parsed.data.city,
        office_name: parsed.data.office_name,
        amount: parsed.data.amount,
        honey: form.honey,
      },
    });
    setSubmitting(false);

    if (error) {
      // FunctionsHttpError carries the original Response on `.context`; surface
      // the server's message (rate-limit / validation) when we can read it.
      let message = 'Could not submit. Try again.';
      const context = (error as { context?: Response }).context;
      if (context && typeof context.json === 'function') {
        try {
          const body = await context.json();
          if (body?.error) message = body.error;
        } catch {
          /* keep the default message */
        }
      }
      toast.error(message);
      console.error(error);
      return;
    }

    toast.success('Report submitted. Thank you for speaking up.');
    setForm({ category: 'bribe', state: '', city: '', office_name: '', description: '', amount: '', honey: '' });
    setPickedPos(null);
  };

  const upvote = async (id: string) => {
    // Optimistic local bump (no auth tracking)
    setReports(prev => prev.map(r => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
    toast.success('+1 — you are not alone.');
  };

  const center = useMemo<[number, number]>(() => [22.5, 80.5], []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-b from-black via-red-950 to-black py-12 px-4 text-center border-b-4 border-yellow-400">
          <h1 className="text-4xl md:text-6xl circus-title text-yellow-400 mb-3">
            Report the Circus
          </h1>
          <p className="text-yellow-200 italic max-w-2xl mx-auto">
            Anonymous. Public. Mapped. Drop a pin on the office, name the act, and let your fellow audience see it.
          </p>
          <p className="text-yellow-400/60 text-xs mt-3">
            No login. No tracking. Be specific, be truthful, no personal accusations without evidence.
          </p>
        </section>

        <div className="container mx-auto px-4 py-8 grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Map */}
          <div className="h-[60vh] lg:h-[75vh] rounded-lg overflow-hidden border-4 border-yellow-400/60 shadow-2xl">
            <MapContainer
              center={center}
              zoom={5}
              minZoom={4}
              maxZoom={18}
              scrollWheelZoom
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClickHandler onPick={(lat, lng) => setPickedPos({ lat, lng })} />

              {pickedPos && (
                <Marker position={[pickedPos.lat, pickedPos.lng]}>
                  <Popup>📍 New report location<br />Fill the form to submit.</Popup>
                </Marker>
              )}

              {reports.map(r => (
                <Marker key={r.id} position={[r.lat, r.lng]}>
                  <Popup>
                    <div className="text-sm max-w-[240px]">
                      <div className="font-bold text-red-700 mb-1">
                        {CATEGORIES.find(c => c.value === r.category)?.label}
                      </div>
                      {(r.office_name || r.city) && (
                        <div className="text-xs text-gray-600 mb-1">
                          {[r.office_name, r.city, r.state].filter(Boolean).join(' · ')}
                        </div>
                      )}
                      <p className="text-gray-800">{r.description}</p>
                      {r.amount && (
                        <div className="mt-1 text-xs"><strong>₹{Number(r.amount).toLocaleString('en-IN')}</strong></div>
                      )}
                      <button
                        onClick={() => upvote(r.id)}
                        className="mt-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded font-bold hover:bg-yellow-300"
                      >
                        ▲ {r.upvotes} — I've faced this too
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="bg-black/60 border-2 border-yellow-400/40 rounded-lg p-5 h-fit lg:sticky lg:top-24">
            <h2 className="text-2xl circus-title text-yellow-400 mb-1">File a Report</h2>
            <p className="text-yellow-200/70 text-xs mb-4">
              {pickedPos
                ? `📍 ${pickedPos.lat.toFixed(4)}, ${pickedPos.lng.toFixed(4)}`
                : 'Click the map to drop a pin →'}
            </p>

            {/* honeypot */}
            <input
              type="text"
              value={form.honey}
              onChange={e => setForm({ ...form, honey: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <Field label="Category">
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value as Category })}
                className="w-full bg-black border border-yellow-400/40 rounded px-3 py-2 text-yellow-100"
              >
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field label="State"><Input value={form.state} onChange={v => setForm({ ...form, state: v })} maxLength={80} placeholder="Karnataka" /></Field>
              <Field label="City"><Input value={form.city} onChange={v => setForm({ ...form, city: v })} maxLength={80} placeholder="Bengaluru" /></Field>
            </div>

            <Field label="Office / Department">
              <Input value={form.office_name} onChange={v => setForm({ ...form, office_name: v })} maxLength={160} placeholder="RTO, Indiranagar branch" />
            </Field>

            <Field label="What happened? *">
              <textarea
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                maxLength={2000}
                rows={4}
                required
                placeholder="Be specific. What was demanded, when, by whom (role, not name without proof)..."
                className="w-full bg-black border border-yellow-400/40 rounded px-3 py-2 text-yellow-100 placeholder:text-yellow-400/40"
              />
              <div className="text-right text-[10px] text-yellow-400/40 mt-1">{form.description.length}/2000</div>
            </Field>

            <Field label="Amount (₹, optional)">
              <Input
                type="number"
                value={form.amount}
                onChange={v => setForm({ ...form, amount: v })}
                placeholder="500"
              />
            </Field>

            <Button
              type="submit"
              variant="circus"
              size="lg"
              disabled={submitting || !pickedPos}
              className="w-full mt-4"
            >
              {submitting ? 'Submitting…' : 'Submit report'}
            </Button>

            <p className="text-yellow-400/50 text-[10px] mt-3 leading-relaxed">
              By submitting you confirm this is truthful. Don't name individuals without evidence — describe roles and offices. Reports are public.{' '}
              <Link to="/sources" className="underline">Methodology</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-3">
      <div className="text-yellow-400/80 text-xs uppercase tracking-wide mb-1">{label}</div>
      {children}
    </label>
  );
}

function Input({ value, onChange, type = 'text', placeholder, maxLength }: {
  value: string; onChange: (v: string) => void; type?: string; placeholder?: string; maxLength?: number;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="w-full bg-black border border-yellow-400/40 rounded px-3 py-2 text-yellow-100 placeholder:text-yellow-400/40"
    />
  );
}
