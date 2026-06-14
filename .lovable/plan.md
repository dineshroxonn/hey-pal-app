## The Great Indian Circus — v2: Satire That's Actually Useful

Drop the $40PCT crypto angle. Keep the circus theme (red/gold/black, Impact, ringmaster voice), but rebuild the core around two real tools: a politician/state explorer and a crowdsourced corruption-report map.

---

### What gets removed
- `TokenSection.tsx` (entire $40PCT section)
- Token nav links, token references in `Hero`, `Footer`, `Header`
- Any "tokenomics" / "buy coin" copy

### What gets added

**1. Cinematic 3D Globe Intro (`<CircusGlobe />`)**
- `three.js` + `@react-three/fiber@^8.18` + `@react-three/drei@^9.122.0`
- Rotating Earth (subtle circus-poster shader: sepia + gold rim light), confetti/spotlight particles
- Auto-zooms into India over ~3s, then crossfades into the 2D map
- "Skip intro" button (stored in `sessionStorage` so it doesn't replay)

**2. Interactive India States Map (`<RingmasterMap />`)**
- 2D SVG of India (28 states + 8 UTs), each state = a "tent"
- Hover → spotlight glow + tooltip with quick stats (CM name, pending cases, "Corruption Drama Score")
- Click → side drawer with full state dossier:
  - Top "Ringmasters" (CM, key MPs/MLAs) — photo, party, term, declared assets, criminal cases, attendance, questions asked
  - State-level stats: pending scam cases, ₹ value, convictions, RTI denials
- Seeded with curated JSON now (`src/data/states.json`, `src/data/politicians.json`); structured so a future API/scraper (MyNeta, ADR, PRS India) can drop in
- Search bar: "Find your ringmaster" (by name / constituency / state)

**3. Crowdsourced Corruption Report Map (`<ReportTheCircus />`)**
- Separate route `/report` with a Leaflet/MapLibre map of India (free, no key)
- Anyone can drop a pin: office/location, category (bribe demanded, ghost project, missing funds, harassment, other), short description, optional photo, amount (₹)
- Anonymous — no login. Lovable Cloud (Supabase) stores reports + Storage for photos
- Map clusters pins; click a pin to read the report; upvote ("I've faced this too")
- Basic abuse guards: rate-limit per IP via edge function, max length, profanity filter list, hCaptcha-free honeypot field, hide reports below a flag threshold
- "Recent reports" ticker on homepage

**4. Updated homepage flow**
```text
Globe intro → Curtain reveal → Hero (new copy: "Step right up. See the show. Then report it.")
→ Live ticker (latest reports)
→ RingmasterMap (the headline feature)
→ Top Ringmasters leaderboard (most cases / lowest attendance)
→ ReportTheCircus CTA card → /report
→ Silent Partners (kept, lightly trimmed)
→ The Audience quiz (kept)
→ Footer (token links removed, add: data sources, methodology, disclaimer)
```

**5. Methodology / Sources page (`/sources`)**
- Required for credibility: list every data source (MyNeta, ADR, ECI, PRS, news links), update cadence, "report a correction" link
- Linked from every stat card

---

### Tech additions
- `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0` (globe)
- `leaflet` + `react-leaflet` + `leaflet.markercluster` (report map — free OSM tiles)
- `react-simple-maps` or hand-rolled SVG for India states map
- Lovable Cloud enabled for:
  - `reports` table (id, lat, lng, state, category, description, amount, photo_url, created_at, upvotes, flags, status)
  - `report_upvotes` (anon device fingerprint based)
  - `corrections` table (user-submitted data fixes)
  - Storage bucket `report-photos` (public read, anon write with size/type limits)
  - Edge function `submit-report` with IP rate-limit + validation (zod)
- RLS: anyone can `insert`/`select` approved reports; only service role can update `status`/`flags`

---

### File-level changes
**Remove**
- `src/components/TokenSection.tsx`

**New**
- `src/components/CircusGlobe.tsx`
- `src/components/RingmasterMap.tsx` + `StateDrawer.tsx` + `PoliticianCard.tsx`
- `src/components/ReportsTicker.tsx`
- `src/pages/Report.tsx` (+ `ReportMap.tsx`, `ReportForm.tsx`, `ReportPin.tsx`)
- `src/pages/Sources.tsx`
- `src/data/states.json`, `src/data/politicians.json` (seed, ~10 marquee states fully populated, rest stubbed)
- `supabase/functions/submit-report/index.ts`
- Migration: tables + RLS + storage bucket

**Edited**
- `src/pages/Index.tsx` — new section order, remove TokenSection
- `src/components/Hero.tsx` — new headline + CTA to report map
- `src/components/Header.tsx` — nav: Show, Ringmasters, Report, Sources
- `src/components/Footer.tsx` — remove token, add sources/methodology/correction links
- `src/App.tsx` — add `/report`, `/sources` routes
- `package.json` — add deps

---

### Scope guardrails (what I'm NOT doing in this pass)
- No real-time scraper integrations (stubbed for a follow-up pass)
- No user accounts / moderation dashboard (admin moderation can be a v3)
- No AI summaries of reports yet
- Seed data covers ~10 states deeply; remaining states show "Tent under construction"

---

### Open question I'll decide while building unless you object
Mobile globe intro is heavy — on `window.innerWidth < 768` I'll skip the 3D globe and go straight to the 2D map with a quick curtain animation. Say the word if you want the globe on mobile too.

Ready to switch to build mode whenever you are.