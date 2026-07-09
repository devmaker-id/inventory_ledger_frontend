import { http } from '@/core/http'

export interface RetailSummary {
  retailId: number
  retailName: string
  distributorName: string
  totalTransactions: number
  totalQty: number
  totalRevenue: number
}

export async function getRetailSummary() {
  const data = await http.get<RetailSummary[]>(
      '/stocks/retail-summary',
    )

  return data
}