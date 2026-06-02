import type { Bill } from '@/types/bill'
import type { Boundary, Ride } from '@/types/finance'
import { seedBills, seedBoundary, seedRides } from '@/mocks/seed'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateBill(b: any): Bill {
  if (!b.nextDueDate) {
    const day = String(b.dueDay ?? 1).padStart(2, '0')
    b.nextDueDate = `2026-06-${day}`
  }
  return b as Bill
}

/**
 * In-memory + localStorage mock backend.
 *
 * This is the ONLY module that should be deleted/replaced when the real
 * Express + Supabase backend lands. Feature API modules talk to this through
 * the small async helpers below so they read like real network calls.
 */

interface DbShape {
  bills: Bill[]
  boundary: Boundary
  rides: Ride[]
}

const STORAGE_KEY = 'mcf-db'

function load(): DbShape {
  if (typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as DbShape
        parsed.bills = parsed.bills.map(migrateBill)
        return parsed
      } catch {
        // fall through to seed
      }
    }
  }
  return { bills: seedBills, boundary: seedBoundary, rides: seedRides }
}

const db: DbShape = load()

function persist(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  }
}

/** Simulate network latency and return a deep copy so callers can't mutate state. */
export function withLatency<T>(produce: () => T, ms = 250): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = produce()
      persist()
      resolve(structuredClone(result))
    }, ms)
  })
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export { db }
