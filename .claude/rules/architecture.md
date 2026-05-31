## Repository Structure

```
my-car-finance/
├── front-end/          # React + TypeScript SPA (all active feature work)
│   └── src/
│       ├── app/        # Router, providers, QueryClient setup
│       ├── components/ # Shared layout (AppLayout, TopBar, BottomNav)
│       ├── features/   # Domain features: bills/, finance/
│       ├── lib/        # Utilities: apiClient, currency, date, queryKeys
│       ├── mocks/      # Mock backend (db.ts + seed.ts) — delete when real API is wired
│       ├── pages/      # Route-level page components
│       ├── theme/      # MUI theme + Zustand dark-mode store
│       └── types/      # Shared domain types (bill.ts, finance.ts)
└── server/             # Express scaffold (health-check only; routes TBD)
    └── src/index.ts
```

### Routing

React Router v7 with a single nested layout:

```
/ (AppLayout — TopBar + BottomNav shell)
  ├── /            → DashboardPage
  ├── /bills       → BillsPage
  ├── /finance     → FinancePage
  └── /reminders   → RemindersPage
```

To add a page: create `src/pages/XPage.tsx` and register the route in `src/app/router.tsx`.

### Mock Backend Seam

`src/mocks/db.ts` is a localStorage-backed in-memory store with simulated latency (`withLatency(250ms)`). It is the **only file** to delete when a real API is ready. All `api/*.ts` files already use the same function signatures, so swapping to `apiClient` (Axios, pre-configured in `src/lib/apiClient.ts`) is mechanical — replace `withLatency(…)` bodies with `apiClient.get/post/patch/delete` calls. Set `VITE_API_URL` env var to point at the backend.

### Domain Overview

**Bills** — recurring monthly expenses. Each `Bill` tracks `amountMonthly`, `dueDay`, and `paidMonths` (array of `YYYY-MM` keys). Features: list, create, edit, delete, toggle-paid per month.

**Finance** — inDrive ride-income tracker. A `Boundary` sets an earnings target (amount + period: daily/weekly/monthly). `Ride` entries record fare + timestamp. `computeProgress()` filters rides by `periodStart()` to show current-period progress.

### React Query Setup

QueryClient is configured in `src/app/providers.tsx` with `staleTime: 30_000` and `refetchOnWindowFocus: false`. All cache keys come from the factory in `src/lib/queryKeys.ts`.

### Server

Minimal Express 4 scaffold. Only `GET /health` is implemented. Future work: add CRUD routes matching the mock API signatures, connect to Supabase Postgres via `pg`, add SQL migrations.

Commands run from `server/`:
```bash
npm run dev    # ts-node-dev with watch
npm run build  # tsc
npm start      # node dist/index.js
```
