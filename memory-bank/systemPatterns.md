# System Patterns: The Great Indian Circus

## System Architecture

Component-based React app; pages compose feature components.

- **Routing** (`src/App.tsx`): `/` → `Index`, `/report` → `Report`, `/sources` → `Sources`, `*` → `NotFound`. `Report` and `Sources` are `React.lazy` routes wrapped in `<Suspense>`.
- **Homepage flow** (`src/pages/Index.tsx`): a phase state machine `globe → curtain → content`, gated by `sessionStorage('circus_intro_seen')` so the intro plays once per session. `CircusGlobe` (Three.js) is lazy-loaded.
- **Content order**: `Header → Hero → ReportsTicker → RingmasterMap → Report CTA → SilentPartners → TheAudience → Footer`.

## Data Patterns

- **Explorer data**: static, curated seed in `src/data/states.ts` (`STATES`, `STATE_BY_CODE`). Typed via `StateData` / `Politician`. ~10 states detailed, the rest "stub" ("tent under construction").
- **Reports backend**: Supabase `reports` table.
  - **Reads**: `supabase.from('reports').select(...)` filtered to `status = 'approved'`, plus realtime `postgres_changes` INSERT subscriptions (ticker + map).
  - **Writes**: `supabase.functions.invoke('submit-report', …)` only — the table does not grant INSERT to clients. The edge function validates + rate-limits by hashed IP using the service role.

## Design Patterns
- **Composition** of small feature components.
- **Theming** via CSS variables in `src/index.css` + Tailwind tokens.
- **Animation** via CSS keyframes and a custom IntersectionObserver hook (`RevealAnimation`, `AnimatedCounter`) — no `framer-motion`.
- **Resilience**: the Supabase client uses placeholder credentials if env vars are missing, so the UI never hard-crashes.
