import {
  Stack,
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CelebrationIcon from '@mui/icons-material/Celebration'
import { alpha } from '@mui/material/styles'
import { PageHeader } from '@/components/common/PageHeader'
import { useBills, useTogglePaid } from '@/features/bills/hooks/useBills'
import { buildReminders, reminderMeta } from '@/features/bills/reminders'
import { categoryMeta } from '@/features/bills/categoryMeta'
import { formatPHP } from '@/lib/currency'

export function RemindersPage() {
  const { data: bills = [], isLoading } = useBills()
  const togglePaid = useTogglePaid()
  const reminders = buildReminders(bills)

  return (
    <>
      <PageHeader title="Reminders" subtitle="Unpaid bills, soonest first" />

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : reminders.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <CelebrationIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h6">All caught up!</Typography>
            <Typography color="text.secondary">
              Every bill is paid for this month.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {reminders.map(({ bill, status, daysUntilDue }) => {
            const meta = categoryMeta[bill.category]
            const Icon = meta.icon
            const rmeta = reminderMeta[status]
            const due =
              daysUntilDue < 0
                ? `${Math.abs(daysUntilDue)} day(s) overdue`
                : daysUntilDue === 0
                  ? 'Due today'
                  : `Due in ${daysUntilDue} day(s)`

            return (
              <Card key={bill.id}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: alpha(meta.color, 0.15), color: meta.color }}>
                    <Icon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }} noWrap>
                      {bill.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPHP(bill.amountMonthly)} · {due}
                    </Typography>
                  </Box>
                  <Chip size="small" color={rmeta.color} label={rmeta.label} />
                  <Button
                    size="small"
                    startIcon={<CheckIcon />}
                    onClick={() => togglePaid.mutate({ id: bill.id })}
                  >
                    Pay
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </Stack>
      )}
    </>
  )
}
