# Project Brief: The Great Indian Circus

## Core Requirements & Goals

"The Great Indian Circus" is a satirical, evidence-styled web application that uses a circus metaphor to comment on Indian politics. Its goal is to make public-record political data engaging *and* to let citizens crowdsource what they see on the ground. It is built around two real tools:

1. **A state / politician explorer** — browse states ("tents") and their politicians ("ringmasters"), with assets, criminal cases, attendance, and a satirical "Drama Score".
2. **A crowdsourced corruption-report map** — an anonymous `/report` page where anyone can drop a pin describing corruption; recent reports stream live on the homepage.

> History: the project began as a `$40PCT` Solana meme-token site. That crypto concept was **fully removed** in the v2 rebuild (`.lovable/plan.md`); the circus theme was kept.

## Technical Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite (SWC)
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** React Router v6
- **3D / Maps:** Three.js (`@react-three/fiber`) for the intro globe; Leaflet for the report map
- **Backend:** Supabase (reports table, realtime, `submit-report` edge function)
- **Validation:** Zod
- **Package Manager:** npm (`package-lock.json`; a legacy `bun.lockb` also exists)
