# Active Context: The Great Indian Circus

## Current Work Focus

Post-rebuild **hardening and cleanup** of the v2 app:
- Refreshed all project docs (`CLAUDE.md` + `memory-bank/`) to match the actual app.
- Removed dead code (`Ringmasters.tsx`, unused `ui/chart.tsx`) and unused deps (`framer-motion`, `recharts`, `intersection-observer`); fixed ESLint errors.
- Added a Supabase **env guard** so the site degrades gracefully instead of white-screening when credentials are absent.
- **Code-split** the heavy Three.js globe and the `/report` (Leaflet) + `/sources` routes out of the initial bundle.
- Added the missing **`submit-report` edge function** (validation + per-IP rate limit) and a migration that revokes direct anonymous INSERTs, closing the open-write-endpoint gap.

## Recent Changes
- v2 rebuild: dropped the `$40PCT` token; added the globe intro, `RingmasterMap`, the `/report` map, and the `/sources` page.
- The hardening pass above.

## Next Steps
- Wire live data scrapers (MyNeta / ADR / PRS) to replace illustrative figures in `src/data/states.ts`.
- Persist upvotes (a `report_upvotes` table — currently optimistic/local only).
- Photo uploads for reports (Supabase Storage bucket + `photo_url`).
- Moderation: flag-threshold hiding, profanity filter.
- Marker clustering on the report map for scale.
