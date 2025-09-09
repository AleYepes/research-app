# Nuxt v3+ Frontend

This application consumes a headless Go API and is responsible for all user-facing interactions and rendering.

## Frontend Principles

### Idiomatic Nuxt and Vue

- Adhere to Nuxt's "convention over configuration" principle.
- Build small, focused, and reusable components.
- Use `<script setup>` for clean and performant component logic.
- Leverage Nuxt's auto-imports to streamline development.

### Component Architecture

- Pass data down with props and emit events up.
- Separate stateful (smart) and presentational (dumb) components.
- Use slots to build flexible and composable components.

### State Management

- Use `ref` and `reactive` for simple, local component state.
- Use Pinia for global state management.
- Modularize Pinia stores by feature or domain.

### Performance Optimization

- Lazy-load off-screen components and images.
- Leverage Nuxt's automatic route-based code splitting.
- Use modern, appropriately-sized image formats like WebP.
- Use `<NuxtLink>` to prefetch resources for faster navigation.

### Hybrid Rendering Strategy

- Pre-render static pages that do not require user-specific data at build time (SSG).
- Render interactive, user-specific pages on the client-side (CSR).
- Define rendering strategies with route rules in `nuxt.config.ts`.

### Testing Strategy

- Write unit tests for isolated components and composables.
- Write component tests to verify rendering and user interactions.
- Use Vitest and `@nuxt/test-utils` for end-to-end (E2E) tests that simulate user flows.
