# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`my-car-finance` is a car finance management application. Currently only the frontend scaffold exists; no backend has been implemented yet.

## Commands

All commands run from the `front-end/` directory:

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Frontend Architecture

**Stack:** React, TypeScript, Vite, MUI (Material UI), React Router v6, TanStack React Query, Axios, Notistack, react-hook-form + Zod, Zustand.

**Path alias:** `@/` maps to `src/`. Always use `@/` for imports — never relative paths.

**React Compiler** is enabled via the Babel preset in `vite.config.ts`. Avoid manually wrapping with `useMemo`/`useCallback` unless profiling shows a clear need.

## TypeScript

Strict mode is on (`noUnusedLocals`, `noUnusedParameters`). Target is ES2023 with bundler module resolution.
