import { http } from '@/core/http'

import type { SaleStockSchema } from '../schemas/sale-stock.schema'

export function saleStock(
  data: SaleStockSchema,
) {
  return http.post(
    '/stocks/sale',
    data,
  )
}