## Frontend Architecture

### Stack

React 19, TypeScript 6, Vite 8 (Rolldown), MUI v9 (Emotion), React Router v7, TanStack React Query v5, Axios, Notistack, react-hook-form + Zod v4, Zustand v5.

### Path Alias

`@/` maps to `src/`. **Always use `@/` for imports, never relative paths.**

### React Compiler

Enabled via Babel preset in `vite.config.ts`. Do not manually add `useMemo`/`useCallback` unless profiling proves a clear need — the compiler handles memoization automatically.

### TypeScript

Strict mode: `noUnusedLocals`, `noUnusedParameters`. Target ES2023, bundler module resolution. `tsc -b` runs before every Vite build — fix all type errors before considering a build successful.

### Feature Folder Pattern

Each domain feature lives under `src/features/{feature}/` and contains:

```
api/        # Data access functions (mock or real Axios calls)
hooks/      # React Query hooks (queries + mutations)
components/ # UI components scoped to the feature
schema.ts   # Zod validators for forms
```

Shared domain types live in `src/types/`. Shared utilities (date, currency, query keys) live in `src/lib/`.

### Mutations & Feedback

All mutations follow this pattern:
1. Call the `api/` function inside `useMutation`
2. On `onSuccess`: call `queryClient.invalidateQueries({ queryKey: queryKeys.x })`
3. On both `onSuccess` and `onError`: call `enqueueSnackbar(...)` (Notistack) with the result message
4. Pass `isPending` as a `saving` prop to the form dialog's submit button to prevent double-submits

### Query Keys

Use the factory in `src/lib/queryKeys.ts` — never inline string arrays directly in `useQuery`/`useMutation` calls.

### Forms

Use `react-hook-form` with `zodResolver`. Numeric fields must use plain `z.number()` (not `z.coerce.number()` — it breaks `zodResolver` typing in Zod v4) with manual `Number()` conversion in the `onChange` handler.

### MUI v9 Notes

`Stack` no longer accepts `alignItems` / `justifyContent` as direct props — put them in the `sx` object instead.

### Theming

Light/dark via Zustand store (`src/theme/useThemeStore.ts`), persisted to localStorage, respects OS preference on first load. Wrap theme changes in the store — do not call `createTheme` ad-hoc.

### Currency & Locale

All monetary amounts are PHP (₱). Use `src/lib/currency.ts` for formatting. No multi-currency support.

### Month Keys

Bills use `YYYY-MM` string keys (e.g. `'2026-05'`) stored in `Bill.paidMonths` to track per-month payment state. Use `monthKey()` from `src/lib/date.ts` to generate them — never construct the string manually.
