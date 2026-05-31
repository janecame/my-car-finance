import type { Boundary, Ride, RideInput } from '@/types/finance'
import { apiClient } from '@/lib/apiClient'

export const financeApi = {
  async getBoundary(): Promise<Boundary> {
    const res = await apiClient.get<{ data: Boundary }>('/boundaries')
    return res.data.data
  },

  async setBoundary(boundary: Boundary): Promise<Boundary> {
    const res = await apiClient.put<{ data: Boundary }>('/boundaries', boundary)
    return res.data.data
  },

  async listRides(): Promise<Ride[]> {
    const res = await apiClient.get<{ data: Ride[] }>('/rides')
    return res.data.data
  },

  async addRide(input: RideInput): Promise<Ride> {
    const res = await apiClient.post<{ data: Ride }>('/rides', input)
    return res.data.data
  },

  async removeRide(id: string): Promise<void> {
    await apiClient.delete(`/rides/${id}`)
  },
}