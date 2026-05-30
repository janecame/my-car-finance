import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NotificationsIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/common/PageHeader'
import { MonthlyTotalCard } from '@/features/bills/components/MonthlyTotalCard'
import { BoundaryProgress } from '@/features/finance/components/BoundaryProgress'
import { BoundaryDialog } from '@/features/finance/components/BoundaryDialog'
import { RideFormDialog } from '@/features/finance/components/RideFormDialog'
import { useBills, summarize } from '@/features/bills/hooks/useBills'
import { buildReminders, reminderMeta } from '@/features/bills/reminders'
import {
  useBoundary,
  useRides,
  useSetBoundary,
  useAddRide,
  computeProgress,
} from '@/features/finance/hooks/useFinance'
import type { BoundaryFormValues, RideFormValues } from '@/features/finance/schema'
import { monthKey } from '@/lib/date'

export function DashboardPage() {
  const navigate = useNavigate()
  const { data: bills = [], isLoading: loadingBills } = useBills()
  const { data: boundary, isLoading: loadingBoundary } = useBoundary()
  const { data: rides, isLoading: loadingRides } = useRides()
  const setBoundary = useSetBoundary()
  const addRide = useAddRide()

  const [rideOpen, setRideOpen] = useState(false)
  const [boundaryOpen, setBoundaryOpen] = useState(false)

  const summary = summarize(bills, monthKey())
  const progress = computeProgress(boundary, rides)
  const reminders = buildReminders(bills).slice(0, 3)

  if (loadingBills || loadingBoundary || loadingRides || !boundary) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  const handleBoundary = (values: BoundaryFormValues) => {
    setBoundary.mutate(values)
    setBoundaryOpen(false)
  }
  const handleRide = (values: RideFormValues) => {
    addRide.mutate(values)
    setRideOpen(false)
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Your bills and inDrive progress at a glance"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setRideOpen(true)}>
            Log ride
          </Button>
        }
      />

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        <MonthlyTotalCard {...summary} />
        <BoundaryProgress
          boundary={boundary}
          progress={progress}
          onEditTarget={() => setBoundaryOpen(true)}
        />
      </Box>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Stack direction="row" sx={{ mb: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <NotificationsIcon color="action" />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Reminders
              </Typography>
            </Stack>
            <Button size="small" onClick={() => navigate('/reminders')}>
              View all
            </Button>
          </Stack>

          {reminders.length === 0 ? (
            <Typography color="text.secondary">No unpaid bills — nice work! 🎉</Typography>
          ) : (
            <Stack spacing={1}>
              {reminders.map(({ bill, status, daysUntilDue }) => (
                <Stack
                  key={bill.id}
                  direction="row"
                  sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Typography>{bill.name}</Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {daysUntilDue < 0
                        ? `${Math.abs(daysUntilDue)}d overdue`
                        : `due in ${daysUntilDue}d`}
                    </Typography>
                    <Chip
                      size="small"
                      color={reminderMeta[status].color}
                      label={reminderMeta[status].label}
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>

      <BoundaryDialog
        open={boundaryOpen}
        boundary={boundary}
        saving={setBoundary.isPending}
        onClose={() => setBoundaryOpen(false)}
        onSubmit={handleBoundary}
      />
      <RideFormDialog
        open={rideOpen}
        saving={addRide.isPending}
        onClose={() => setRideOpen(false)}
        onSubmit={handleRide}
      />
    </>
  )
}
