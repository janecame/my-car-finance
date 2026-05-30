import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { billsApi } from '@/features/bills/api/billsApi'
import { queryKeys } from '@/lib/queryKeys'
import type { Bill, BillInput } from '@/types/bill'

export function useBills() {
  return useQuery({ queryKey: queryKeys.bills, queryFn: billsApi.list })
}

function useInvalidateBills() {
  const qc = useQueryClient()
  return () => qc.invalidateQueries({ queryKey: queryKeys.bills })
}

export function useCreateBill() {
  const invalidate = useInvalidateBills()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: (input: BillInput) => billsApi.create(input),
    onSuccess: () => {
      invalidate()
      enqueueSnackbar('Bill added', { variant: 'success' })
    },
    onError: () => enqueueSnackbar('Could not add bill', { variant: 'error' }),
  })
}

export function useUpdateBill() {
  const invalidate = useInvalidateBills()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: BillInput }) =>
      billsApi.update(id, input),
    onSuccess: () => {
      invalidate()
      enqueueSnackbar('Bill updated', { variant: 'success' })
    },
    onError: () => enqueueSnackbar('Could not update bill', { variant: 'error' }),
  })
}

export function useDeleteBill() {
  const invalidate = useInvalidateBills()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: (id: string) => billsApi.remove(id),
    onSuccess: () => {
      invalidate()
      enqueueSnackbar('Bill deleted', { variant: 'default' })
    },
    onError: () => enqueueSnackbar('Could not delete bill', { variant: 'error' }),
  })
}

export function useTogglePaid() {
  const invalidate = useInvalidateBills()
  const { enqueueSnackbar } = useSnackbar()
  return useMutation({
    mutationFn: ({ id, month }: { id: string; month?: string }) =>
      billsApi.togglePaid(id, month),
    onSuccess: () => invalidate(),
    onError: () => enqueueSnackbar('Could not update payment', { variant: 'error' }),
  })
}

/** Derived monthly figures for a list of bills. */
export function summarize(bills: Bill[], month: string) {
  const total = bills.reduce((sum, b) => sum + b.amountMonthly, 0)
  const paid = bills
    .filter((b) => b.paidMonths.includes(month))
    .reduce((sum, b) => sum + b.amountMonthly, 0)
  return { total, paid, remaining: total - paid }
}
