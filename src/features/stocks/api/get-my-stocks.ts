import { http } from '@/core/http'

import type { Stock } from '../types/stock.types'

export function getMyStocks() {
  return http.get<Stock[]>(
    '/stocks/me',
  )
}