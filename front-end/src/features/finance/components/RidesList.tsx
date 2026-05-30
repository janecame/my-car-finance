import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi'
import { formatPHP } from '@/lib/currency'
import type { Ride } from '@/types/finance'

interface Props {
  rides: Ride[]
  onDelete: (id: string) => void
}

export function RidesList({ rides, onDelete }: Props) {
  if (rides.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          No rides logged yet. Tap “Log ride” after each customer.
        </Typography>
      </Box>
    )
  }

  return (
    <List disablePadding>
      {rides.map((ride) => (
        <ListItem
          key={ride.id}
          secondaryAction={
            <IconButton edge="end" aria-label="Delete ride" onClick={() => onDelete(ride.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <LocalTaxiIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 600 }}>{formatPHP(ride.fare)}</Typography>
            }
            secondary={
              <>
                {new Date(ride.date).toLocaleString('en-PH', {
                  hour: '2-digit',
                  minute: '2-digit',
                  month: 'short',
                  day: 'numeric',
                })}
                {ride.note ? ` · ${ride.note}` : ''}
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}
