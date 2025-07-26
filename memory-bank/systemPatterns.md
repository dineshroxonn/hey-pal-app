# System Patterns: Hey Pal App

## System Architecture

The application follows a component-based architecture, which is standard for modern frontend frameworks like React. The code is organized into `pages`, `components`, and `hooks`, promoting a clear separation of concerns.

*   **Routing:** The application uses `react-router-dom` for routing. The main entry point is the `/` route, which renders the `Index` page. A catch-all `*` route handles not-found pages.
*   **Page Composition:** The `Index` page is the core of the application. It composes all the thematic components (`Header`, `Hero`, `Ringmasters`, etc.) to create the main user experience. It also features an initial animation (`CurtainOpening`) to introduce the content.
*   **Components:** Reusable UI elements that are composed to build pages. There is a distinction between feature-specific components (e.g., `Ringmasters`) and generic UI components (in `components/ui`).
*   **Hooks:** Reusable logic that can be shared across components.

## Key Technical Decisions

*   **Component Library:** The presence of a `components/ui` directory, filled with common UI elements like `Button`, `Card`, and `Dialog`, indicates a key decision to use a design system or a pre-built component library (like shadcn/ui). This promotes consistency and accelerates development.
*   **TypeScript for Type Safety:** The use of TypeScript (`.tsx`, `.ts` files) is a deliberate choice to enforce type safety, which helps in building a more robust and maintainable application.
*   **Vite for Development:** The choice of Vite as a build tool suggests a focus on a fast and efficient development experience.

## Design Patterns

*   **Composition:** The application is built by composing smaller, reusable components to create more complex UIs.
*   **State Management:** While not explicitly clear from the file structure, a modern React application will use state management patterns. This could be through React's built-in hooks (`useState`, `useContext`) or a dedicated library. The `hooks` directory suggests custom hooks are used to encapsulate and reuse stateful logic.
