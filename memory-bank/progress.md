# Progress: The Great Indian Circus

## What Works
- **Intro flow:** lazy-loaded Three.js globe → curtain → content, gated by sessionStorage.
- **State explorer:** `RingmasterMap` tent grid, search (state/capital/politician/party), `StateDrawer` dossiers, stub states.
- **Report map:** Leaflet map, click-to-drop-pin, Zod-validated form, submission via the `submit-report` edge function, realtime updates.
- **Homepage ticker** and **`/sources`** methodology page.
- **Build** is green; **ESLint errors are at 0** (only inherited shadcn fast-refresh warnings remain).
- **Bundle:** Three.js and Leaflet are code-split out of the initial chunk.
- **Resilience:** Supabase env guard prevents white-screening without credentials.

## What's Left to Build
- Live data scrapers (MyNeta / ADR / PRS) to replace illustrative figures in `src/data/states.ts`.
- Persisted upvotes (currently optimistic/local only — needs a `report_upvotes` table).
- Photo uploads (Supabase Storage bucket + `photo_url`).
- Moderation (flag-threshold hiding, profanity filter) and map marker clustering.

## Current Status
v2 is built and hardened. Core UX, the explorer, and the reporting pipeline are functional end-to-end.

## Known Issues / Notes
- Politician/state numbers are **illustrative placeholders**, not verified data (by design, pending scrapers).
- The `submit-report` edge function **and** the hardening migration must be deployed together for submissions to work; reads (ticker/map) are unaffected if they aren't.
- Repo carries both `package-lock.json` (npm) and a legacy `bun.lockb`.
