import { http } from '@/core/http'

import type { SaleHistory } from '../types/stock.types'

export function getSales(
  userId: number
) {
  const response =  http.get<SaleHistory[]>(
    `/stocks/sales/${userId}`,
  )
  return response
}