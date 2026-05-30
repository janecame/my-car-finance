import type { Boundary, Ride, RideInput } from '@/types/finance'
import { db, uid, withLatency } from '@/mocks/db'

/**
 * inDrive financing data access. Mock-backed for now; swap bodies for
 * `apiClient` calls when the backend is ready.
 */
export const financeApi = {
  getBoundary(): Promise<Boundary> {
    return withLatency(() => db.boundary)
  },

  setBoundary(boundary: Boundary): Promise<Boundary> {
    return withLatency(() => {
      db.boundary = boundary
      return db.boundary
    })
  },

  listRides(): Promise<Ride[]> {
    return withLatency(() =>
      [...db.rides].sort((a, b) => b.date.localeCompare(a.date)),
    )
  },

  addRide(input: RideInput): Promise<Ride> {
    return withLatency(() => {
      const ride: Ride = {
        id: uid('ride'),
        date: input.date ?? new Date().toISOString(),
        fare: input.fare,
        note: input.note,
      }
      db.rides.push(ride)
      return ride
    })
  },

  removeRide(id: string): Promise<void> {
    return withLatency(() => {
      db.rides = db.rides.filter((r) => r.id !== id)
    })
  },
}
