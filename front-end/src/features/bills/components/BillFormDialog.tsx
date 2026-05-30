import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
} from '@mui/material'
import { billSchema, billCategories, type BillFormValues } from '@/features/bills/schema'
import { categoryMeta } from '@/features/bills/categoryMeta'
import type { Bill } from '@/types/bill'

interface Props {
  open: boolean
  bill: Bill | null
  saving?: boolean
  onClose: () => void
  onSubmit: (values: BillFormValues) => void
}

const emptyValues: BillFormValues = {
  name: '',
  category: 'other',
  amountMonthly: 0,
  dueDay: 1,
}

export function BillFormDialog({ open, bill, saving, onClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BillFormValues>({
    resolver: zodResolver(billSchema),
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (open) {
      reset(
        bill
          ? {
              name: bill.name,
              category: bill.category,
              amountMonthly: bill.amountMonthly,
              dueDay: bill.dueDay,
            }
          : emptyValues,
      )
    }
  }, [open, bill, reset])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>{bill ? 'Edit bill' : 'Add bill'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  autoFocus
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Category" select fullWidth>
                  {billCategories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {categoryMeta[c].label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="amountMonthly"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  label="Monthly amount"
                  type="number"
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                    },
                  }}
                  error={!!errors.amountMonthly}
                  helperText={errors.amountMonthly?.message}
                />
              )}
            />
            <Controller
              name="dueDay"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  label="Due day of month"
                  type="number"
                  fullWidth
                  error={!!errors.dueDay}
                  helperText={errors.dueDay?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {bill ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
