# Tech Context: Hey Pal App

## Technologies Used

*   **Core Framework:** React 18
*   **Language:** TypeScript 5
*   **Build Tool:** Vite 5
*   **Package Manager:** bun (inferred from `bun.lockb`)
*   **Styling:** Tailwind CSS 3
*   **Routing:** React Router DOM 6
*   **Linting:** ESLint 9

## Key Dependencies

*   **UI Components:**
    *   `@radix-ui/*`: A collection of unstyled, accessible UI components that form the foundation of the `components/ui` library.
    *   `shadcn/ui` (inferred): The structure of `components/ui` and the use of Radix UI, `clsx`, and `tailwind-merge` are strong indicators of `shadcn/ui`.
    *   `lucide-react`: For icons.
*   **Blockchain Integration:**
    *   The project features the `$40PCT` token, which is a meme token on the Solana blockchain.
*   **State Management & Data Fetching:**
    *   `@tanstack/react-query`: For managing server state, including caching, refetching, and optimistic updates.
*   **Forms:**
    *   `react-hook-form`: For building and managing forms.
    *   `zod`: For schema validation, used with `react-hook-form`.
*   **Utilities:**
    *   `clsx` & `tailwind-merge`: For constructing dynamic and conflict-free class names with Tailwind CSS.
    *   `date-fns`: For date manipulation.
    *   `recharts`: For creating charts.

## Development Setup

*   **Run Development Server:** `bun run dev`
*   **Build for Production:** `bun run build`
*   **Linting:** `bun run lint`
