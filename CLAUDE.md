# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## What this app is

"The Great Indian Circus" is a satirical, evidence-styled atlas of Indian politics built around two real tools under a circus theme (red/gold/black, Impact font, "ringmaster" voice):

1. **State / politician explorer** — `RingmasterMap` + `StateDrawer`, seeded from `src/data/states.ts` (politicians as "ringmasters", states as "tents", a satirical "Drama Score").
2. **Crowdsourced corruption-report map** — the `/report` page (Leaflet + Supabase): anyone can anonymously drop a pin describing corruption; recent reports stream on the homepage ticker.

> History: an earlier version was a `$40PCT` Solana meme-token site. That concept was **fully removed** during the v2 rebuild (see `.lovable/plan.md`). Do **not** reintroduce token/crypto features.

## Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (SWC plugin)
- **Styling**: Tailwind CSS + shadcn/ui (Radix primitives)
- **Routing**: React Router v6
- **3D**: Three.js via `@react-three/fiber` + `@react-three/drei` (globe intro)
- **Maps**: Leaflet + `react-leaflet` (report map, free OSM tiles)
- **Backend**: Supabase (`@supabase/supabase-js`) — reports table + realtime + edge function
- **Forms/validation**: Zod
- **Data fetching**: a TanStack Query provider is mounted in `App.tsx` but is currently unused — the two data calls use the Supabase client directly. Kept for future use.

### Project Structure
- `/src/components/` - Feature components (`CircusGlobe`, `CurtainOpening`, `Header`, `Hero`, `ReportsTicker`, `RingmasterMap`, `StateDrawer`, `SilentPartners`, `TheAudience`, `Footer`) plus the shadcn/ui library in `/src/components/ui/`
- `/src/pages/` - `Index`, `Report`, `Sources`, `NotFound`
- `/src/data/states.ts` - Curated state/politician seed data (illustrative until live data is wired in)
- `/src/integrations/supabase/` - Client (`client.ts`) and generated `types.ts`
- `/src/hooks/`, `/src/lib/` - Custom hooks and the `cn()` utility
- `/supabase/` - `config.toml`, `migrations/`, and `functions/submit-report/`
- `/memory-bank/` - Project documentation

### Key Architectural Patterns
1. **Homepage intro flow**: `Index.tsx` is a phase state machine `globe → curtain → content`, gated by `sessionStorage('circus_intro_seen')` so it plays once per session. `CircusGlobe` is lazy-loaded (heavy Three.js); `/report` and `/sources` are lazy routes — this keeps Three.js and Leaflet out of the initial bundle.
2. **Path Aliases**: `@/` maps to `./src/`.
3. **TypeScript**: relaxed config (no-implicit-any off, unused allowed, strict null checks disabled).
4. **UI Library**: shadcn/ui components under `/src/components/ui/`.
5. **Theming**: CSS-variable theme in `src/index.css` integrated with Tailwind. Animations are CSS keyframes plus a custom IntersectionObserver-based `RevealAnimation` — there is **no** `framer-motion`.
6. **Dev server**: port 8080, host `::` (IPv6).

### Backend (Supabase)
- Single `reports` table. RLS: anyone may **SELECT** `approved` reports; direct **INSERT** by `anon`/`authenticated` is **revoked**.
- All report writes go through the **`submit-report` edge function** (input validation + per-IP rate limiting via the service role). The client calls `supabase.functions.invoke('submit-report', …)`.
- Realtime `postgres_changes` INSERT subscriptions power the homepage ticker and the live map.
- Requires env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). The client falls back to inert placeholders if they're missing, so the UI still renders (reports just stay empty).
- Migrations and the edge function live under `/supabase` and are deployed by Lovable on sync. **The migration + edge function must be deployed together for submissions to work** — reads are unaffected.

### Important Context
This is a Lovable project (created on lovable.dev) with automatic GitHub syncing. Politician/state figures are **illustrative/satirical placeholders** pending live data (MyNeta, ADR, ECI, PRS India, CAG). Crowdsourced `/report` entries are real and anonymous. Disclaimers and the `/sources` methodology page back the satire — keep them intact.
