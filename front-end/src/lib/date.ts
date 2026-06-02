/** Month key for grouping, e.g. `2026-05`. */
export function monthKey(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** Human label for a month key, e.g. `2026-05` → `May 2026`. */
export function monthLabel(key: string = monthKey()): string {
  const [year, month] = key.split('-').map(Number)
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Advance an ISO date string by one month, preserving the day-of-month.
 * e.g. `'2026-06-15'` → `'2026-07-15'`
 */
export function advanceOneMonth(isoDate: string): string {
  const d = new Date(isoDate)
  const day = d.getUTCDate()
  d.setUTCMonth(d.getUTCMonth() + 1)
  // If month overflow shifted the day (e.g. Jan 31 → Mar 3), clamp to last day of next month.
  if (d.getUTCDate() !== day) {
    d.setUTCDate(0)
  }
  return d.toISOString().slice(0, 10)
}

/** Format an ISO date string to a human-readable label, e.g. `'2026-06-15'` → `'Jun 15, 2026'`. */
export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

/** True when two dates fall on the same calendar day. */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Start of the period (daily/weekly/monthly) containing `ref`. */
export function periodStart(
  period: 'daily' | 'weekly' | 'monthly',
  ref: Date = new Date(),
): Date {
  const d = new Date(ref)
  d.setHours(0, 0, 0, 0)
  if (period === 'daily') return d
  if (period === 'weekly') {
    // Week starts on Monday.
    const day = (d.getDay() + 6) % 7
    d.setDate(d.getDate() - day)
    return d
  }
  d.setDate(1)
  return d
}
