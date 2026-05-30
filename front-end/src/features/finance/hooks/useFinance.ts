import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { financeApi } from '@/features/finance/api/financeApi'
import { queryKeys } from '@/lib/queryKeys'
import { periodStart } from '@/lib/date'
import type { Boundary, Ride, RideInput } from '@/types/finance'

export function useBoundary() {
  return useQuery({ queryKey: queryKeys.boundary, queryFn: financeApi.getBoundary })
}

export function useRides() {
  return useQuery({ queryKey: queryKeys.rides, queryFn: financeApi.listRides })
}

export function useSetBoundary() {
  const qc = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: (boundary: Boundary) => financeApi.setBoundary(boundary),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.boundary })
      enqueueSnackbar('Target updated', { variant: 'success' })
    },
    onError: () => enqueueSnackbar('Could not update target', { variant: 'error' }),
  })
}

export function useAddRide() {
  const qc = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: (input: RideInput) => financeApi.addRide(input),
    onSuccess: (ride) => {
      qc.invalidateQueries({ queryKey: queryKeys.rides })
      enqueueSnackbar(`Ride logged: ₱${ride.fare}`, { variant: 'success' })
    },
    onError: () => enqueueSnackbar('Could not log ride', { variant: 'error' }),
  })
}

export function useRemoveRide() {
  const qc = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: (id: string) => financeApi.removeRide(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.rides }),
    onError: () => enqueueSnackbar('Could not delete ride', { variant: 'error' }),
  })
}

export interface FinanceProgress {
  earned: number
  remaining: number
  progress: number
  reached: boolean
  ridesThisPeriod: Ride[]
}

/** Derive earned / remaining / progress for the current period. */
export function computeProgress(
  boundary: Boundary | undefined,
  rides: Ride[] | undefined,
): FinanceProgress {
  const target = boundary?.amount ?? 0
  const start = periodStart(boundary?.period ?? 'daily')
  const ridesThisPeriod = (rides ?? []).filter((r) => new Date(r.date) >= start)
  const earned = ridesThisPeriod.reduce((sum, r) => sum + r.fare, 0)
  const remaining = Math.max(target - earned, 0)
  const progress = target > 0 ? Math.min(earned / target, 1) : 0
  return { earned, remaining, progress, reached: earned >= target && target > 0, ridesThisPeriod }
}
