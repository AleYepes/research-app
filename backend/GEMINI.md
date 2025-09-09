# Go 1.25+ Backend

This application serves as a headless API server, providing a secure and reliable interface for a Nuxt.js v4 frontend.

## Backend Principles

### Project Structure

- Only place application entry points (like `main.go`) in the cmd directory.
- Keep all business logic and internal packages within the `internal/` directory.
- Organize internal packages by business domain to ensure a clear separation of concerns.
- Keep `main.go` minimal, limiting it to dependency injection and starting the server.

### Unidirectional Dependency Rule

- Ensure the entities layer (the core domain types, usually named after the internal package) has zero dependencies on other layers.
- Make the use-cases layer (the business logic orchestration, usually in `service.go`) depend only on the entities layer.
- Make the controllers layer (the HTTP request handling, usually in `http.go`) depend only on the use-cases layer.

### Idiomatic Go

- Run `go fmt` regularly to maintain consistent code formatting.
- Use clear and concise names for variables, functions, and packages.
- Prioritize simple, clear, and readable code over clever solutions.
- Except for managing the dependency rule, always start with the simplest solution for a given task, avoiding all complex abstractions.
- Only use design patterns or abstractions, like the strategy or builder pattern, when many classes, attributes and/or methods are required.

### Error Handling

- Return errors as values to be handled by the caller.
- Wrap errors with meaningful yet brief context to simplify debugging.
- Handle or return errors immediately; do not ignore them.
- Reserve panics exclusively for unrecoverable, exceptional situations.
- Channel errors from goroutines back to the caller for proper handling.

### Concurrency

- Use channels to communicate safely between goroutines.
- Write simple and understandable concurrent code.
- Prefer channels for concurrency, using `sync` primitives only when necessary.
- Avoid global variables and shared state to prevent race conditions.

### Testing Strategy

- Write focused unit tests for critical functions in complete isolation.
- Use table-driven tests to concisely cover a wide range of inputs.
- Write integration tests to validate interactions between components.
- Test all edge cases and potential failure modes to ensure robustness.
