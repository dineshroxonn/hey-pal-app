-- Harden report submission.
--
-- Before: anyone could INSERT into public.reports directly with the public anon
-- key, so the only abuse protection was a client-side honeypot + zod (trivially
-- bypassed). After: writes go through the `submit-report` edge function (service
-- role), which validates input and rate-limits by hashed IP.

-- 1) Rate-limit ledger. Service-role only: RLS is enabled with NO policies, so
--    anon/authenticated can't read or write it; the service role bypasses RLS.
--    Raw IPs are never stored here (the function inserts a salted SHA-256 hash).
CREATE TABLE IF NOT EXISTS public.report_rate_limit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ip_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS report_rate_limit_lookup_idx
  ON public.report_rate_limit (ip_hash, created_at DESC);

ALTER TABLE public.report_rate_limit ENABLE ROW LEVEL SECURITY;

GRANT ALL ON public.report_rate_limit TO service_role;

-- 2) Stop direct client inserts into reports. The edge function uses the service
--    role and bypasses RLS, so legitimate submissions still succeed.
DROP POLICY IF EXISTS "Anyone can submit reports" ON public.reports;
REVOKE INSERT ON public.reports FROM anon;
REVOKE INSERT ON public.reports FROM authenticated;

-- SELECT of approved reports stays open (the "Anyone can view approved reports"
-- policy and the SELECT grants from the initial migration are unchanged), so the
-- homepage ticker and the map keep working without credentials beyond the anon key.
