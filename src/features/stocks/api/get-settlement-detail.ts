import { http } from '@/core/http'

export interface SettlementTransaction {
  id: number
  retailName: string
  productName: string
  qty: number
  salePrice: number
  totalPrice: number
  createdAt: string
}

export interface SettlementDetail {
  distributor: {
    id: number
    name: string
  }

  summary: {
    totalTransactions: number
    totalQty: number
    totalRevenue: number
    ownerShare: number
    distributorShare: number
  }

  transactions: SettlementTransaction[]
}

export async function getSettlementDetail(
  distributorId: number,
) {
  const response =
    await http.get<SettlementDetail>(
      `/stocks/settlement-detail/${distributorId}`,
    )

  return response
}