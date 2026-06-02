import type { Bill } from '@/types/bill'
import { monthKey } from '@/lib/date'

export type ReminderStatus = 'overdue' | 'dueSoon' | 'upcoming'

export interface Reminder {
  bill: Bill
  status: ReminderStatus
  /** Days until due (negative when overdue). */
  daysUntilDue: number
}

/** Unpaid bills, classified by how close the next due date is. */
export function buildReminders(bills: Bill[], now: Date = new Date()): Reminder[] {
  const month = monthKey(now)
  const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()

  return bills
    .filter((b) => !b.paidMonths.includes(month))
    .map((bill) => {
      const [y, m, d] = bill.nextDueDate.split('-').map(Number)
      const dueDateMs = new Date(y, m - 1, d).getTime()
      const daysUntilDue = Math.round((dueDateMs - todayMs) / 86_400_000)
      const status: ReminderStatus =
        daysUntilDue < 0 ? 'overdue' : daysUntilDue <= 5 ? 'dueSoon' : 'upcoming'
      return { bill, status, daysUntilDue }
    })
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue)
}

export const reminderMeta: Record<
  ReminderStatus,
  { label: string; color: 'error' | 'warning' | 'info' }
> = {
  overdue: { label: 'Overdue', color: 'error' },
  dueSoon: { label: 'Due soon', color: 'warning' },
  upcoming: { label: 'Upcoming', color: 'info' },
}
