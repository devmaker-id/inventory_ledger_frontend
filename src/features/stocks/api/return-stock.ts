import { http } from '@/core/http'

import type {
  ReturnStockSchema,
} from '../schemas/return-stock.schema'

type ReturnStockResponse = {
  success: boolean
  message: string
}

export async function returnStock(
  payload: ReturnStockSchema,
) {
  const response =
    await http.post<ReturnStockResponse>(
      '/stocks/return',
      payload,
    )

  return response
}