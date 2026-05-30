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
import { boundarySchema, periods, type BoundaryFormValues } from '@/features/finance/schema'
import type { Boundary } from '@/types/finance'

interface Props {
  open: boolean
  boundary: Boundary
  saving?: boolean
  onClose: () => void
  onSubmit: (values: BoundaryFormValues) => void
}

export function BoundaryDialog({ open, boundary, saving, onClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BoundaryFormValues>({
    resolver: zodResolver(boundarySchema),
    defaultValues: boundary,
  })

  useEffect(() => {
    if (open) reset(boundary)
  }, [open, boundary, reset])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Edit earning target</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  label="Target amount"
                  type="number"
                  autoFocus
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                    },
                  }}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />
            <Controller
              name="period"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Per" select fullWidth>
                  {periods.map((p) => (
                    <MenuItem key={p} value={p} sx={{ textTransform: 'capitalize' }}>
                      {p}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
