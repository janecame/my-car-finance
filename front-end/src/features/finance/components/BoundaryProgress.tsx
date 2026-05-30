import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Stack,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { formatPHP } from '@/lib/currency'
import type { Boundary } from '@/types/finance'
import type { FinanceProgress } from '@/features/finance/hooks/useFinance'

const periodLabel: Record<Boundary['period'], string> = {
  daily: 'Today',
  weekly: 'This week',
  monthly: 'This month',
}

interface Props {
  boundary: Boundary
  progress: FinanceProgress
  onEditTarget: () => void
}

export function BoundaryProgress({ boundary, progress, onEditTarget }: Props) {
  const pct = Math.round(progress.progress * 100)

  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="overline" color="text.secondary">
              {periodLabel[boundary.period]} — target {formatPHP(boundary.amount)}
            </Typography>
            <Chip size="small" label={boundary.period} variant="outlined" sx={{ height: 20 }} />
          </Stack>
          <Tooltip title="Edit target">
            <IconButton size="small" onClick={onEditTarget} aria-label="Edit target">
              <TuneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 0.5, mb: 1.5, alignItems: 'baseline' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }} color="secondary.main">
            {formatPHP(progress.earned)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            earned
          </Typography>
          {progress.reached && (
            <Chip
              size="small"
              icon={<CheckCircleIcon />}
              color="success"
              label="Target reached!"
              sx={{ ml: 'auto' }}
            />
          )}
        </Stack>

        <LinearProgress
          variant="determinate"
          value={pct}
          color={progress.reached ? 'success' : 'secondary'}
        />

        <Stack direction="row" sx={{ mt: 1, justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {pct}% of target
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {progress.remaining > 0
              ? `${formatPHP(progress.remaining)} to go`
              : 'Goal met 🎉'}
          </Typography>
        </Stack>

        <Box sx={{ mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {progress.ridesThisPeriod.length} ride
            {progress.ridesThisPeriod.length === 1 ? '' : 's'} {periodLabel[boundary.period].toLowerCase()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
