import { apiClient } from '@/lib/apiClient'

export type HealthStatus = {
  status: 'ok' | 'degraded'
  db: 'ok' | 'error'
}

export async function getHealth(): Promise<HealthStatus> {
  const { data } = await apiClient.get<HealthStatus>('/health')
  return data
}