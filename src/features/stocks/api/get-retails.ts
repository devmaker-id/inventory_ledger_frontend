import { http } from '@/core/http'

import type { Retail } from '../types/stock.types'

export function getRetails(
  parentId: number,
) {
  return http.get<Retail[]>(
    `/stocks/parentid/${parentId}`,
  )
}