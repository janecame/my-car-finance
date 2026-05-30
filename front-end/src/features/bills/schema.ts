import { z } from 'zod'

export const billCategories = ['motorcycle', 'phone', 'car', 'other'] as const

export const billSchema = z.object({
  name: z.string().min(1, 'Name is required').max(60),
  category: z.enum(billCategories),
  amountMonthly: z.number().positive('Must be greater than 0'),
  dueDay: z.number().int('Whole number').min(1, 'Day 1–31').max(31, 'Day 1–31'),
})

export type BillFormValues = z.infer<typeof billSchema>
