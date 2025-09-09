# Research Web App

## Tech Stack

- Backend: Go 1.25+ and `go-chi/chi/v5` (headless API server)
- Frontend: TS 5.0+, Nuxt.js 3+, and Vue 3+
- Styling: Tailwind CSS v4, `shadcn-nuxt`, and apache echarts
- Build Tools: Go native build system and Vite for Nuxt.js
- Deployment: Coolify/Docker
- Database: Postgres with `sqlc-dev/sqlc` for type-safety and `pgvector` for vector search
- Migration: `golang-migrate/migrate` for database migrations
- Observability: `log/slog` injected in main
- Testing: `testing` + `testcontainers/testcontainers-go`for Go, and Vitest + `@nuxt/test-utils` for Nuxt
- Authentication: JWT with `golang-jwt/jwt`, OAuth2 with `golang.org/x/oauth2`
- Linting: `golangci/golangci-lint` for Go, and `@nuxt/eslint` for TypeScript

## Architectural Principles

### 1. Follow Go and Nuxt Idioms and Conventions

- Keep all code simple and pragmatic, prioritizing clarity and simplicity over cleverness.
- Except for managing the dependency rule, always start with the simplest solution for a given task, avoiding all complex abstractions.
- Only use design patterns or abstractions, like the strategy or builder pattern, when many classes, attributes and/or methods are required.

### 2. Modularity with Managed Coupling

- Keep the frontend and backend completely decoupled, interacting only via APIs.
- Structure the backend modules by business domain, not by technical layers.
- Organize domain modules into self-contained subdirectories within `internal/`.
- Enforce a clear separation of concerns, aspiring for high cohesion within domain modules and low coupling between them.
- Limit domain module coupling to truly cross-cutting concerns, like authentication and middleware.

### 3. Unidirectional Dependency Rule

- The entities layer that describes core business logic, entities, and interfaces, usually in`domain.go`, should have no dependencies on other layers.
- The use-cases layer that describes logic implementations, usually in `service.go`, should only depend on the entities layer.
- The controllers layer that defines handlers, usually in `http.go`, should only depend on the use-cases layer.

### 4. Testing Strategy

- Write unit tests to test singular critical functions in complete isolation.
- Write integration tests to ensure the interaction between key components (e.g. a service and a test database, or an HTTP handler and its service).
- Always explore edge cases and failure modes when writing tests.

### 5. Hybrid Rendering

- Pre-render most static pages (homepage, about page, blog, etc) at build time for instant loading.
- Render pages that require user-specific data or high interactivity (user dashboards, research dashboards, etc) client-side.

## Project Structure

```
/
├── cmd/
│   └── api/
│       └── main.go             # Wires up HTTP server, API routes, and dependencies
│
├── internal/
│   ├── database/
│   │   ├── schema/             # migration .sql files
│   │   ├── queries/
│   │   │   ├── posts.sql
│   │   │   ├── users.sql
│   │   │   └── comments.sql
│   │   ├── generated/          # sqlc output lives here (git-ignored)
│   │   ├── database.go         # connection pooling, transaction helpers
│   │   └── database_test.go
│   ├── redditresearch/
│   │   ├── domain.go           # Defines Subreddit, Posts and Comments structs and the relevant interfaces (service and repository)
│   │   ├── repository.go       # Implements internal/database/generated
│   │   ├── http.go             # Page and API handlers
│   │   ├── service.go          # Business logic implementation
│   │   └── service_test.go
│   ├── user/                   # Domain-dependent structure
│   ├── redditclient/           # Background worker that populates and updates tables for redditresearch
│   ├── blog/
│   ├── ...
│   ├── auth/
│   └── middleware/
│
├── frontend/
│   ├── .nuxt/
│   ├── .output/
│   ├── assets/                     # Uncompiled assets like Sass files, images, or fonts
│   ├── components/
│   │   ├── ...
│   │   └── redditresearch/
│   │       ├── ResearchChart.vue   # Example of a highly interactive component
│   │       └── SearchBar.vue
│   ├── layouts/
│   │   ├── default.vue             # Default layout for pages
│   │   └── blog.vue                # Custom layout for blog pages
│   ├── pages/
│   │   ├── index.vue               # Homepage (prerender: true)
│   │   ├── ...
│   │   ├── blog/
│   │   │   ├── index.vue           # Blog listing (prerender: true)
│   │   │   └── [slug].vue          # Dynamic blog post pages (prerender: true)
│   │   └── redditresearch/
│   │       └── index.vue           # Dashboard (ssr: false)
│   ├── plugins/
│   ├── public/
│   ├── .gitignore
│   ├── app.vue
│   ├── app.config.ts
│   ├── error.vue
│   ├── nuxt.config.ts              # Defines routeRules for hybrid rendering
│   ├── package.json
│   └── tsconfig.json
│
├── .github/                        # CI/CD workflows for both backend and frontend
├── .gitignore
├── .env
├── air.toml
├── docker-compose.yml
├── Dockerfile
├── go.mod
├── go.sum
├── Makefile
└── sqlc.yaml
```