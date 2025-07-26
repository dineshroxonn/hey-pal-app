# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on port 8080
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Animation**: Framer Motion

### Project Structure
- `/src/components/` - React components including custom UI components and shadcn/ui library
- `/src/pages/` - Page components (Index, NotFound)
- `/src/hooks/` - Custom React hooks (intersection observer, mobile detection, scroll position, toast)
- `/src/lib/` - Utilities (mainly cn() for className merging)
- `/memory-bank/` - Project documentation and context files

### Key Architectural Patterns

1. **Component Architecture**: The app uses a component-based structure with a curtain opening animation that reveals the main content. The Index page orchestrates multiple themed sections (Hero, Ringmasters, SilentPartners, TheAudience, TokenSection).

2. **Path Aliases**: Uses `@/` alias for `./src/` directory imports throughout the codebase.

3. **TypeScript Configuration**: Configured with relaxed type checking (no implicit any, unused parameters/locals allowed, strict null checks disabled).

4. **UI Component Library**: Extensive use of shadcn/ui components with Radix UI primitives. All UI components are in `/src/components/ui/`.

5. **Theming**: CSS variables-based theming system integrated with Tailwind CSS. The app appears to be "The Great Indian Circus" - a satirical web application commenting on Indian politics with a circus theme.

6. **Development Server**: Configured to run on port 8080 with IPv6 support (host: "::").

### Important Context
This is a Lovable project (created on lovable.dev) with automatic GitHub syncing. The project uses a circus theme to present political satire, featuring a native token called `$40PCT` (referring to "40% corruption rate").