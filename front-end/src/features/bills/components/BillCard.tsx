import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  Switch,
  IconButton,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { alpha } from '@mui/material/styles'
import type { Bill } from '@/types/bill'
import { categoryMeta } from '@/features/bills/categoryMeta'
import { formatPHP } from '@/lib/currency'
import { monthKey } from '@/lib/date'

interface Props {
  bill: Bill
  onTogglePaid: (id: string) => void
  onEdit: (bill: Bill) => void
  onDelete: (bill: Bill) => void
}

export function BillCard({ bill, onTogglePaid, onEdit, onDelete }: Props) {
  const meta = categoryMeta[bill.category]
  const Icon = meta.icon
  const paid = bill.paidMonths.includes(monthKey())

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: alpha(meta.color, 0.15), color: meta.color }}>
          <Icon />
        </Avatar>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
            {bill.name}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {formatPHP(bill.amountMonthly)} / mo
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              label={`Due day ${bill.dueDay}`}
              sx={{ height: 20 }}
            />
          </Stack>
        </Box>

        <Stack sx={{ mr: 0.5, alignItems: 'center' }}>
          <Tooltip title={paid ? 'Paid this month' : 'Mark as paid'}>
            <Switch checked={paid} onChange={() => onTogglePaid(bill.id)} color="success" />
          </Tooltip>
          <Typography variant="caption" color={paid ? 'success.main' : 'text.secondary'}>
            {paid ? 'Paid' : 'Unpaid'}
          </Typography>
        </Stack>

        <IconButton aria-label="Edit bill" onClick={() => onEdit(bill)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Delete bill" onClick={() => onDelete(bill)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}
