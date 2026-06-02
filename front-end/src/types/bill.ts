export type BillCategory = 'motorcycle' | 'phone' | 'car' | 'other'

export interface Bill {
  id: string
  name: string
  category: BillCategory
  /** Recurring monthly payment amount, in PHP. */
  amountMonthly: number
  /** Next due date as an ISO date string (e.g. `2026-06-15`). Advances by one month after each payment. */
  nextDueDate: string
  /** Optional final payment date as an ISO date string (e.g. `2027-01-15`). Bill is complete after this date. */
  endDate?: string
  /** Months already settled, as `YYYY-MM` keys (e.g. `2026-05`). */
  paidMonths: string[]
}

export type BillInput = Omit<Bill, 'id' | 'paidMonths'>
