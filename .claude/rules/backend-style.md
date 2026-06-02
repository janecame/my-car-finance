## Backend Style

### Stack

Express 4, TypeScript, ts-node-dev (dev), `pg` (Postgres client via Supabase).

### Structure

```
server/
├── src/
│   ├── index.ts        # App entry — mounts routes, starts server
│   ├── routes/         # One file per domain (bills.ts, rides.ts, boundaries.ts)
│   ├── db/             # pg Pool setup and query helpers
│   └── middleware/     # Error handler, request logger
└── migrations/         # Plain SQL migration files
```

### Route Conventions

- Use resource-oriented URLs: `GET /bills`, `POST /bills`, `PATCH /bills/:id`, `DELETE /bills/:id`.
- Route handlers must match the mock function signatures in `src/mocks/db.ts` exactly — swapping mock → real is the goal.
- Return `{ data: ... }` on success and `{ error: string }` on failure.
- Use HTTP status codes: `200` OK, `201` Created, `204` No Content (delete), `400` Bad Request, `404` Not Found, `500` Internal Server Error.

### TypeScript

- Strict mode on — same `tsconfig` settings as the frontend.
- Run `npm run build` (`tsc`) before considering server work done; fix all type errors.

### Error Handling

- Wrap all async route handlers in a `try/catch` and pass errors to `next(err)`.
- The central error-handler middleware returns `{ error: err.message }` with status `500` unless a specific status was set.

### Environment Variables

Individual connection vars (set in `server/.env`, never committed):
- `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME` — Supabase Postgres credentials.
- `SERVER_PORT` — defaults to `3001`.
- Never read `process.env` directly in route files — import from `src/config.ts` which validates all required vars at startup and throws on missing values.