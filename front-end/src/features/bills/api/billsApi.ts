import type { Bill, BillInput } from '@/types/bill'
import { db, uid, withLatency } from '@/mocks/db'
import { monthKey } from '@/lib/date'

/**
 * Bills data access. Backed by the mock store today; swap each body for an
 * `apiClient` call when the Express backend is ready (signatures stay the same).
 */
export const billsApi = {
  list(): Promise<Bill[]> {
    return withLatency(() => db.bills)
  },

  create(input: BillInput): Promise<Bill> {
    return withLatency(() => {
      const bill: Bill = { ...input, id: uid('bill'), paidMonths: [] }
      db.bills.push(bill)
      return bill
    })
  },

  update(id: string, input: BillInput): Promise<Bill> {
    return withLatency(() => {
      const bill = db.bills.find((b) => b.id === id)
      if (!bill) throw new Error('Bill not found')
      Object.assign(bill, input)
      return bill
    })
  },

  remove(id: string): Promise<void> {
    return withLatency(() => {
      db.bills = db.bills.filter((b) => b.id !== id)
    })
  },

  /** Toggle the paid state of a bill for a given month (defaults to current). */
  togglePaid(id: string, month: string = monthKey()): Promise<Bill> {
    return withLatency(() => {
      const bill = db.bills.find((b) => b.id === id)
      if (!bill) throw new Error('Bill not found')
      bill.paidMonths = bill.paidMonths.includes(month)
        ? bill.paidMonths.filter((m) => m !== month)
        : [...bill.paidMonths, month]
      return bill
    })
  },
}
