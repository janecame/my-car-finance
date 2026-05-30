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
