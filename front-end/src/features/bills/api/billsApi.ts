import type { Bill, BillInput } from '@/types/bill'
import { apiClient } from '@/lib/apiClient'
import { monthKey } from '@/lib/date'

export const billsApi = {
  async list(): Promise<Bill[]> {
    const res = await apiClient.get<{ data: Bill[] }>('/bills')
    return res.data.data
  },

  async create(input: BillInput): Promise<Bill> {
    const res = await apiClient.post<{ data: Bill }>('/bills', input)
    return res.data.data
  },

  async update(id: string, input: BillInput): Promise<Bill> {
    const res = await apiClient.patch<{ data: Bill }>(`/bills/${id}`, input)
    return res.data.data
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/bills/${id}`)
  },

  async togglePaid(id: string, month: string = monthKey()): Promise<Bill> {
    const res = await apiClient.patch<{ data: Bill }>(`/bills/${id}/toggle-paid`, { month })
    return res.data.data
  },
}