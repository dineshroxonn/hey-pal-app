
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  state TEXT,
  city TEXT,
  office_name TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC,
  photo_url TEXT,
  upvotes INTEGER NOT NULL DEFAULT 0,
  flags INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'approved',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reports
  ADD CONSTRAINT reports_category_check CHECK (category IN ('bribe','ghost_project','missing_funds','harassment','red_tape','other')),
  ADD CONSTRAINT reports_status_check CHECK (status IN ('approved','pending','hidden')),
  ADD CONSTRAINT reports_lat_check CHECK (lat BETWEEN -90 AND 90),
  ADD CONSTRAINT reports_lng_check CHECK (lng BETWEEN -180 AND 180),
  ADD CONSTRAINT reports_desc_len CHECK (char_length(description) BETWEEN 10 AND 2000);

CREATE INDEX reports_created_at_idx ON public.reports (created_at DESC);
CREATE INDEX reports_status_idx ON public.reports (status);

GRANT SELECT, INSERT ON public.reports TO anon;
GRANT SELECT, INSERT ON public.reports TO authenticated;
GRANT ALL ON public.reports TO service_role;

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reports
CREATE POLICY "Anyone can view approved reports"
  ON public.reports FOR SELECT
  USING (status = 'approved');

-- Anyone can submit a report (anonymous platform)
CREATE POLICY "Anyone can submit reports"
  ON public.reports FOR INSERT
  WITH CHECK (status = 'approved' OR status = 'pending');
