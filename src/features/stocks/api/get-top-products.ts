import { http } from '@/core/http'

export interface TopProduct {
  productId: number
  productName: string
  totalTransactions: number
  totalQty: number
  totalRevenue: number
}

type GetTopProductsResponse = {
  success: boolean
  data: TopProduct[]
}

export async function getTopProducts() {
  const response = await http.get<TopProduct[]>(
      '/stocks/top-products',
    )

  return response
}