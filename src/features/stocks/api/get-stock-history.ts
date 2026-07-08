import { http } from '@/core/http'

import type { StockHistory } from '../types/stock.types'

export function getStockHistory(
  userId: number
) {
  const response =  http.get<StockHistory[]>(
    `/stocks/history/${userId}`,
  )
  return response
}