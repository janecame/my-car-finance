import { Alert, AlertTitle, Box } from '@mui/material'

interface Props {
  message?: string
}

export function FetchError({ message = 'Something went wrong. Please try again.' }: Props) {
  return (
    <Box sx={{ py: 4 }}>
      <Alert severity="error">
        <AlertTitle>Failed to load data</AlertTitle>
        {message}
      </Alert>
    </Box>
  )
}
