import { useState } from 'react'
import { Button, Stack, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { PageHeader } from '@/components/common/PageHeader'
import { FetchError } from '@/components/common/FetchError'
import { BoundaryProgress } from '@/features/finance/components/BoundaryProgress'
import { BoundaryDialog } from '@/features/finance/components/BoundaryDialog'
import { RideFormDialog } from '@/features/finance/components/RideFormDialog'
import { RidesList } from '@/features/finance/components/RidesList'
import {
  useBoundary,
  useRides,
  useSetBoundary,
  useAddRide,
  useRemoveRide,
  computeProgress,
} from '@/features/finance/hooks/useFinance'
import type { BoundaryFormValues, RideFormValues } from '@/features/finance/schema'

export function FinancePage() {
  const { data: boundary, isLoading: loadingBoundary, isError: boundaryError } = useBoundary()
  const { data: rides, isLoading: loadingRides, isError: ridesError } = useRides()
  const setBoundary = useSetBoundary()
  const addRide = useAddRide()
  const removeRide = useRemoveRide()

  const [rideOpen, setRideOpen] = useState(false)
  const [boundaryOpen, setBoundaryOpen] = useState(false)

  const progress = computeProgress(boundary, rides)

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
        title="inDrive financing"
        subtitle="Log each ride and reach your target to finance the car"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setRideOpen(true)}>
            Log ride
          </Button>
        }
      />

      {boundaryError || ridesError ? (
        <FetchError
          message={
            boundaryError
              ? 'Could not load your earnings target. Try refreshing the page.'
              : 'Could not load your rides. Try refreshing the page.'
          }
        />
      ) : loadingBoundary || loadingRides || !boundary ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          <BoundaryProgress
            boundary={boundary}
            progress={progress}
            onEditTarget={() => setBoundaryOpen(true)}
          />

          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Rides this period
              </Typography>
              <RidesList
                rides={progress.ridesThisPeriod}
                onDelete={(id) => removeRide.mutate(id)}
              />
            </CardContent>
          </Card>
        </Stack>
      )}

      {boundary && (
        <BoundaryDialog
          open={boundaryOpen}
          boundary={boundary}
          saving={setBoundary.isPending}
          onClose={() => setBoundaryOpen(false)}
          onSubmit={handleBoundary}
        />
      )}
      <RideFormDialog
        open={rideOpen}
        saving={addRide.isPending}
        onClose={() => setRideOpen(false)}
        onSubmit={handleRide}
      />
    </>
  )
}
