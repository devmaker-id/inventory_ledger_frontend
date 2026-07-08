import { http } from '@/core/http'

import type { Stock } from '../types/stock.types'

export function getUserStocks(
  userId: number,
) {
  return http.get<Stock[]>(
    `/stocks/${userId}`,
  )
}