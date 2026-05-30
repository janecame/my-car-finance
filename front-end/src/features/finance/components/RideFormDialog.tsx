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
  Stack,
  InputAdornment,
} from '@mui/material'
import { rideSchema, type RideFormValues } from '@/features/finance/schema'

interface Props {
  open: boolean
  saving?: boolean
  onClose: () => void
  onSubmit: (values: RideFormValues) => void
}

export function RideFormDialog({ open, saving, onClose, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RideFormValues>({
    resolver: zodResolver(rideSchema),
    defaultValues: { fare: 0, note: '' },
  })

  useEffect(() => {
    if (open) reset({ fare: 0, note: '' })
  }, [open, reset])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogTitle>Log a ride</DialogTitle>
        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <Controller
              name="fare"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  label="Fare earned"
                  type="number"
                  autoFocus
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                    },
                  }}
                  error={!!errors.fare}
                  helperText={errors.fare?.message}
                />
              )}
            />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Note (optional)" fullWidth />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            Add ride
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
