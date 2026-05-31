## Testing

### Stack

**Frontend:** Vitest + React Testing Library + jsdom.
**Backend:** Vitest (or Jest) with Supertest for Express route integration tests.

### File Placement

- Unit/component tests: co-located next to the source file (`BillCard.test.tsx` beside `BillCard.tsx`).
- Integration tests: `server/src/__tests__/` for route-level tests.

### Frontend Rules

- Mock the `api/` layer with `vi.mock('@/features/bills/api/billsApi')` — never call the real mock db in tests.
- For React Query hooks, wrap renders in a `QueryClientProvider` with a fresh `QueryClient` per test.
- For mutation hooks, assert both the `queryClient.invalidateQueries` call and the `enqueueSnackbar` call on success and on error.
- Use `screen.getByRole` and accessible queries over `getByTestId`.

### Backend Rules

- Use Supertest to fire real HTTP requests against the Express app.
- Tests hit a separate test database (set `DATABASE_URL` to a test schema or use `pg` transaction rollback per test).
- Never mock `pg` — integration tests must prove the SQL actually works.

### Running Tests

```bash
# Frontend (from front-end/)
npx vitest run            # single run
npx vitest                # watch mode

# Backend (from server/)
npx vitest run
```

The `test-runner.sh` hook automatically runs Vitest on a test file after Claude edits it.