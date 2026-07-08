import { http } from '@/core/http'

import type { TransferStockSchema } from '../schemas/transfer-stock.schema'

export function transferStock(
  data: TransferStockSchema,
) {
  return http.post(
    '/stocks/transfer',
    data,
  )
}