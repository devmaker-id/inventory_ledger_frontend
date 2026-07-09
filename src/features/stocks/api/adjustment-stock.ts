import { http } from '@/core/http'

import type {
  AdjustmentStockSchema,
} from '../schemas/adjustment-stock.schema'

type AdjustmentStockResponse = {
  success: boolean
  message: string
}

export async function adjustmentStock(
  payload: AdjustmentStockSchema,
) {
  const response =
    await http.post<AdjustmentStockResponse>(
      '/stocks/adjustment',
      payload,
    )

  return response
}