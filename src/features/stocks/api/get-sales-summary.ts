import { http } from '@/core/http'

export type SalesSummary = {
  totalTransactions: number
  totalQty: number
  totalRevenue: number
}

export function getSalesSummary() {
  return http.get<SalesSummary>(
    '/stocks/sales-summary',
  )
}