import axios from 'axios'

/**
 * Pre-configured Axios instance for the future Express backend.
 *
 * Not used yet — the app currently runs on the mock store in `@/mocks/db`.
 * When the backend lands, each feature's `api/*Api.ts` swaps its mock-store
 * calls for `apiClient` requests; nothing else needs to change.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' },
})
