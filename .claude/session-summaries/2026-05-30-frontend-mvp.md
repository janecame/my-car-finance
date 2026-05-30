# Session Summary — Frontend MVP (mock-data pass)

**Date:** 2026-05-30
**Project:** my-car-finance — personal bill tracker with an inDrive financing feature

---

## Goal

Build the complete, working frontend UI on a local mock-data layer, leaving a clean
seam to plug in an Express + Supabase backend later.

### Decisions locked in (via clarifying questions)
- **Sequencing:** Frontend-first with mock data (no live backend calls yet).
- **Auth:** Single user, no login.
- **Currency:** PHP `₱`.
- **Supabase:** Not connected yet — code structured so it drops in later.

### Starting point
Repo was just the default Vite + React 19 template under `front-end/`. None of the
declared stack (MUI, Router, React Query, Axios, Zustand, react-hook-form/Zod,
Notistack) was installed; no `@/` alias; no backend; no Supabase/MCP.

---

## What was built & verified

`npm run build` (tsc + vite) and `npm run lint` both pass clean.

### Setup
- Installed full stack: MUI v9, @mui/icons-material, @emotion, @fontsource/roboto,
  react-router-dom v7, @tanstack/react-query, axios, notistack, react-hook-form,
  zod v4, @hookform/resolvers v5, zustand.
- Wired `@/` alias in `front-end/vite.config.ts` and `front-end/tsconfig.app.json`.
- Replaced the Vite demo (`App.tsx`, `App.css`, `index.css`, `main.tsx`).

### Theme
- `src/theme/theme.ts` — Material-You-inspired light/dark MUI themes (Google blue/green,
  rounded surfaces), Roboto font.
- `src/theme/useThemeStore.ts` — OS-aware, persisted dark/light Zustand store; toggle in top bar.

### App shell
- `src/app/providers.tsx` (Query + Theme + Notistack), `src/app/router.tsx`.
- `src/components/layout/` — `AppLayout`, `TopBar` (tabs on desktop), `BottomNav` (mobile),
  `ThemeToggle`, `navItems`.

### Mock backend seam
- `src/mocks/db.ts` — localStorage-backed store with simulated latency (the single file
  to delete when the real backend lands); seeded from `src/mocks/seed.ts`.
- `src/lib/` — `apiClient.ts` (pre-wired Axios for the future backend), `queryKeys.ts`,
  `currency.ts` (`formatPHP`), `date.ts` (month keys, period boundaries).

### Features
- **Bills** (`src/features/bills/`) — `billsApi`, `useBills` hooks, Zod `schema`,
  `categoryMeta`, components: `BillCard`, `BillFormDialog`, `MonthlyTotalCard`,
  plus `reminders.ts` (overdue / due-soon / upcoming classification).
- **inDrive financing** (`src/features/finance/`) — `financeApi`, `useFinance` hooks
  (`computeProgress`: earned/remaining/progress), Zod `schema`, components:
  `BoundaryProgress`, `BoundaryDialog`, `RideFormDialog`, `RidesList`.

### Pages (`src/pages/`)
- `DashboardPage` — monthly total + inDrive progress + top reminders.
- `BillsPage` — list, add/edit/delete, paid toggles, monthly total.
- `FinancePage` — editable ₱700 target, log fares, progress bar (₱120 ride → ₱580 to go).
- `RemindersPage` — unpaid bills, soonest first.

---

## Gotchas resolved (newer-than-expected dependency versions)
- **MUI v9** dropped `alignItems`/`justifyContent` as direct `Stack` props — moved them
  into `sx`. (`direction`/`spacing` still valid props.)
- **Zod v4** `z.coerce.number()` makes the resolver input type `unknown`, breaking
  `useForm`/`zodResolver` typing — switched numeric fields to plain `z.number()` with a
  numeric `onChange` (`Number(e.target.value)`).
- **TypeScript 6** deprecates `baseUrl` — removed it; `paths` works under bundler resolution.
- Icon `DeleteOutline` doesn't exist in this icons version — used `DeleteOutlined`.

---

## Run it
```bash
cd front-end
npm run dev
```

## Out of scope (next passes)
- Express + TypeScript backend using `pg` → Supabase Postgres, with SQL migrations.
- Supabase project wiring + MCP server.
- Auth (kept single-user for now).
- Optional cleanup: unreferenced template assets `hero.png`, `react.svg`, `vite.svg`.
