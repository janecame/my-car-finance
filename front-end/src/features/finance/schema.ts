import { z } from 'zod'

export const periods = ['daily', 'weekly', 'monthly'] as const

export const boundarySchema = z.object({
  amount: z.number().positive('Must be greater than 0'),
  period: z.enum(periods),
})
export type BoundaryFormValues = z.infer<typeof boundarySchema>

export const rideSchema = z.object({
  fare: z.number().positive('Must be greater than 0'),
  note: z.string().max(80).optional(),
})
export type RideFormValues = z.infer<typeof rideSchema>
