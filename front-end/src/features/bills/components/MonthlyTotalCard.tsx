import { Card, CardContent, Typography, Box, LinearProgress, Stack } from '@mui/material'
import { formatPHP } from '@/lib/currency'
import { monthLabel } from '@/lib/date'

interface Props {
  total: number
  paid: number
  remaining: number
}

export function MonthlyTotalCard({ total, paid, remaining }: Props) {
  const pct = total > 0 ? Math.round((paid / total) * 100) : 0

  return (
    <Card sx={{ background: (t) => t.palette.primary.main, color: 'primary.contrastText' }}>
      <CardContent>
        <Typography variant="overline" sx={{ opacity: 0.85 }}>
          {monthLabel()} — total bills
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {formatPHP(total)}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={pct}
          color="inherit"
          sx={{ bgcolor: 'rgba(255,255,255,0.25)', mb: 1.5 }}
        />

        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              Paid
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{formatPHP(paid)}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="caption" sx={{ opacity: 0.85 }}>
              Remaining
            </Typography>
            <Typography sx={{ fontWeight: 600 }}>{formatPHP(remaining)}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
