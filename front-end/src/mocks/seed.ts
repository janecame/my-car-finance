import type { Bill } from '@/types/bill'
import type { Boundary, Ride } from '@/types/finance'
import { monthKey } from '@/lib/date'

export const seedBills: Bill[] = [
  {
    id: 'bill-motorcycle',
    name: 'Motorcycle loan',
    category: 'motorcycle',
    amountMonthly: 3200,
    dueDay: 5,
    paidMonths: [monthKey()],
  },
  {
    id: 'bill-phone',
    name: 'Phone plan',
    category: 'phone',
    amountMonthly: 999,
    dueDay: 12,
    paidMonths: [],
  },
  {
    id: 'bill-car',
    name: 'Car financing',
    category: 'car',
    amountMonthly: 8500,
    dueDay: 20,
    paidMonths: [],
  },
  {
    id: 'bill-internet',
    name: 'Internet',
    category: 'other',
    amountMonthly: 1499,
    dueDay: 28,
    paidMonths: [],
  },
]

export const seedBoundary: Boundary = {
  amount: 700,
  period: 'daily',
}

export const seedRides: Ride[] = [
  { id: 'ride-1', date: new Date().toISOString(), fare: 120, note: 'Airport drop-off' },
  { id: 'ride-2', date: new Date().toISOString(), fare: 85 },
]
