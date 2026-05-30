const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  maximumFractionDigits: 0,
})

const phpFormatterDecimals = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** Format a number as Philippine pesos, e.g. `1234` → `₱1,234`. */
export function formatPHP(value: number, withDecimals = false): string {
  return (withDecimals ? phpFormatterDecimals : phpFormatter).format(value)
}
