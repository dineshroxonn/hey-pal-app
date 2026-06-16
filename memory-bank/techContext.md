# Tech Context: The Great Indian Circus

## Technologies Used
- **Core Framework:** React 18
- **Language:** TypeScript 5
- **Build Tool:** Vite 5 (`@vitejs/plugin-react-swc`)
- **Styling:** Tailwind CSS 3 + shadcn/ui (Radix UI)
- **Routing:** React Router DOM 6
- **Linting:** ESLint 9 (flat config, `typescript-eslint`)
- **Package Manager:** npm (`package-lock.json`; a legacy `bun.lockb` is also present)

## Key Dependencies
- **3D:** `three`, `@react-three/fiber`, `@react-three/drei` — the intro globe (`CircusGlobe`).
- **Maps:** `leaflet`, `react-leaflet` — the `/report` map (free OpenStreetMap tiles).
- **Backend:** `@supabase/supabase-js` — `reports` table, realtime, and the `submit-report` edge function.
- **Forms/validation:** `react-hook-form` (available) + `zod` (used for report validation).
- **Data fetching:** `@tanstack/react-query` provider is mounted but currently unused for fetching.
- **UI:** `@radix-ui/*`, `lucide-react` (icons), `class-variance-authority`, `clsx`, `tailwind-merge`, `sonner` (toasts), `next-themes`.

## Environment
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` enable live reports (see `.env.example`). Absent → client uses inert placeholders and reports stay empty.
- Edge function env (provided by Supabase): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, optional `RATE_LIMIT_SALT`.

## Development Setup
- **Run:** `npm run dev` (port 8080)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Supabase:** migrations in `supabase/migrations/`, edge function in `supabase/functions/submit-report/`; deployed by Lovable on sync.
