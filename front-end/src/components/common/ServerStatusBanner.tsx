import { Alert, Collapse } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getHealth } from '@/lib/healthApi'
import { queryKeys } from '@/lib/queryKeys'

export function ServerStatusBanner() {
  const { data, isError } = useQuery({
    queryKey: queryKeys.health,
    queryFn: getHealth,
    refetchInterval: 30_000,
    retry: 1,
  })

  const message = isError
    ? 'Network error: Cannot connect to the server.'
    : data?.db === 'error'
      ? 'Server error: Database connection failed.'
      : null

  return (
    <Collapse in={message !== null}>
      <Alert severity="error" sx={{ borderRadius: 0 }}>
        {message}
      </Alert>
    </Collapse>
  )
}