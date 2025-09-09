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

### Modularity with Managed Coupling

- Decouple the frontend and backend completely; all interaction must occur through APIs.
- Organize backend modules by business domain, not by technical function.
- Organize domain modules into self-contained subdirectories within `backend/internal/`.
- Enforce a clear separation of concerns to achieve high cohesion within domain modules and low coupling between them.
- Restrict coupling between domain modules to cross-cutting concerns like authentication and middleware.

### Unidirectional Dependency Rule

- Ensure the entities layer (the core domain types, usually named after the internal package) has zero dependencies on other layers.
- Make the use-cases layer (the business logic orchestration, usually in `service.go`) depend only on the entities layer.
- Make the controllers layer (the HTTP request handling, usually in `http.go`) depend only on the use-cases layer.

### Follow Go and Nuxt Idioms and Conventions

- Prioritize clear, simple, and pragmatic code over complex solutions.
- Except for managing the dependency rule, always start with the simplest solution for a given task, avoiding all complex abstractions.
- Only use design patterns or abstractions, like the strategy or builder pattern, when many classes, attributes and/or methods are required.

### Hybrid Rendering Strategy

- Pre-render static, non-user-specific pages (e.g., homepage, about, blog) at build time.
- Render dynamic, user-specific pages (e.g., dashboards) on the client-side.

### Testing Strategy

- Test critical functions in isolation with focused unit tests.
- Use integration tests to verify interactions between key components (e.g., service to database).
- Thoroughly test edge cases and potential failure modes.

## Example Project Structure

```bash
/
├── .github/                        # CI/CD workflows for both backend and frontend
│
├── backend/
│   ├── cmd/
│   │   └── api/
│   │       └── main.go             # Wires up HTTP server, API routes, and dependencies
│   ├── internal/
│   │   ├── database/
│   │   │   ├── schema/             # Migration .sql files
│   │   │   ├── queries/
│   │   │   │   ├── posts.sql
│   │   │   │   ├── users.sql
│   │   │   │   └── comments.sql
│   │   │   ├── generated/          # sqlc output lives here (git-ignored)
│   │   │   ├── database.go         # Connection pooling, transaction helpers
│   │   │   └── database_test.go
│   │   ├── redditresearch/
│   │   │   ├── domain.go           # Defines Subreddit, Posts and Comments structs and the relevant interfaces (service and repository)
│   │   │   ├── repository.go       # Implements internal/database/generated
│   │   │   ├── http.go             # Page and API handlers
│   │   │   ├── service.go          # Business logic implementation
│   │   │   └── service_test.go
│   │   ├── user/                   # Domain-specific structure
│   │   ├── redditclient/           # Background worker that populates and updates tables for redditresearch
│   │   ├── blog/
│   │   ├── ...
│   │   ├── auth/
│   │   └── middleware/
│   ├── .air.toml
│   ├── .gitignore
│   ├── .goreleaser.yml
│   ├── go.mod
│   ├── go.sum
│   ├── main
│   └── sqlc.yaml
│
├── frontend/
│   ├── .nuxt/
│   ├── assets/                     # Assets for the build tool to process (fonts, tailwind.css, etc)
│   ├── components/
│   │   ├── ui/                     # shadcn-nuxt components
│   │   ├── ...
│   │   └── redditresearch/         # Domain-specific custom components
│   │       └── ResearchChart.vue
│   ├── composables/
│   ├── middleware/                 # Code to run before navigating to a particular route
│   ├── dist/
│   ├── lib/
│   ├── layouts/                    # Common UI patterns as reusable layouts
│   ├── pages/
│   │   ├── index.vue               # Homepage (prerender: true)
│   │   ├── ...
│   │   ├── blog/
│   │   │   ├── index.vue           # Blog explorer
│   │   │   └── [slug].vue          # Dynamic blog post pages (prerender: true)
│   │   └── redditresearch/
│   │       └── index.vue           # Dashboard (ssr: false)
│   ├── plugins/
│   ├── public/
│   ├── .gitignore
│   ├── app.vue
│   ├── components.json             # shadcn-nuxt configs
│   ├── eslint.config.mjs
│   ├── nuxt.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .env                            # Global build/dev-time environment variables
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── Makefile
└── README.md
```
