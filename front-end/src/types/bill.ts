export type BillCategory = 'motorcycle' | 'phone' | 'car' | 'other'

export interface Bill {
  id: string
  name: string
  category: BillCategory
  /** Recurring monthly payment amount, in PHP. */
  amountMonthly: number
  /** Day of the month the bill is due (1–31). */
  dueDay: number
  /** Months already settled, as `YYYY-MM` keys (e.g. `2026-05`). */
  paidMonths: string[]
}

export type BillInput = Omit<Bill, 'id' | 'paidMonths'>
