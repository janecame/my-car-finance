# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`my-car-finance` is a personal car-finance management app for tracking recurring bills and inDrive ride income (PHP / ₱). The frontend MVP is complete and runs against a mock backend. The Express server has full CRUD routes for bills, boundaries, and rides wired to Supabase Postgres.

## Commands

Frontend (run from `front-end/`):
```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b + Vite production build
npm run lint      # ESLint (flat config)
npm run preview   # Preview production build locally
```

Server (run from `server/`):
```bash
npm run dev       # ts-node-dev with watch
npm run build     # tsc
npm start         # node dist/index.js
```

Tests:
```bash
# Frontend (from front-end/)
npx vitest run            # single run
npx vitest                # watch mode

# Backend (from server/)
npx vitest run
```

## Architecture

See `.claude/rules/architecture.md` for the full directory map, routing structure, and domain overview.  
See `.claude/rules/frontend-style.md` for stack details, feature folder pattern, and coding conventions.

**Quick orientation:**
- Feature work lives in `front-end/src/features/{bills,finance}/` — each has `api/`, `hooks/`, `components/`, `schema.ts`.
- `front-end/src/mocks/db.ts` is the only file to delete when a real API is wired up. All `api/*.ts` signatures are already real-API-compatible.
- All amounts are PHP (₱). Use `src/lib/currency.ts` — never format manually.
- Use `src/lib/queryKeys.ts` for all React Query cache keys — never inline string arrays.

## Frontend Stack

React 19, TypeScript 6, Vite 8, MUI v9, React Router v7, TanStack React Query v5, Zustand v5, react-hook-form + Zod v4, Notistack, Axios.

**Path alias:** `@/` → `src/`. Always use `@/` — never relative paths.

**React Compiler** is enabled in `vite.config.ts`. Do not add `useMemo`/`useCallback` unless profiling shows a clear need.

## Known Quirks

- **Zod v4 + zodResolver:** `z.coerce.number()` breaks resolver typing — use plain `z.number()` and convert with `Number()` in the `onChange` handler.
- **MUI v9 `Stack`:** `alignItems` / `justifyContent` are no longer direct props — move them into `sx`.
- **Bill payment state:** tracked as `YYYY-MM` strings in `Bill.paidMonths`. Always use `monthKey()` from `src/lib/date.ts`.
- **Bill due dates:** `dueDay: number` was removed. Bills now carry `nextDueDate: string` (ISO date, advances after each payment) and optional `endDate: string`. Use `advanceOneMonth()` from `src/lib/date.ts` to advance the date.
- **Bill categories:** `Bill.category` is one of `'motorcycle' | 'phone' | 'car' | 'other'` — use the `billCategories` const from `features/bills/schema.ts`.

## Prompt Clarification Rule

Before acting on any user prompt, paraphrase the request back and ask "Is this what you mean?" Wait for confirmation before writing any code. This applies to all feature requests, bug fixes, and refactors.

## Prompt Assist Rule

Before starting any task, recommend the best settings in this format — one line each, with a short reason why:

```
Model:   Sonnet — good for most coding tasks, fast and capable
Effort:  Medium — standard feature work, no need for deep search
Thinking: Off — task is straightforward, no complex reasoning needed
```

Use these guidelines to pick each option:

**Model**
- `Haiku` — simple lookups, quick questions, no code changes
- `Sonnet` — most coding tasks, bug fixes, feature work
- `Opus` — complex architecture decisions, ambiguous multi-step problems, or when being wrong is costly

**Effort**
- `Low` — quick questions, single-file edits, simple lookups
- `Medium` — standard feature work, refactors, most code tasks
- `High` — security reviews, large refactors, thorough debugging across many files

**Thinking**
- `Off` — task is clear and well-defined
- `On` — task involves subtle logic, tricky constraints, or multi-step reasoning where mistakes are hard to catch
