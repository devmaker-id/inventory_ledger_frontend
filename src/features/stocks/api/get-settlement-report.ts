import { http } from '@/core/http'

export interface SettlementReport {
  distributorId: number
  distributorName: string

  period: {
    startDate: string | null
    endDate: string | null
  }

  totalTransactions: number
  totalQty: number
  totalRevenue: number
  ownerShare: number
  distributorShare: number
}


export async function getSettlementReport() {
  const response = await http.get<SettlementReport[]>(
      '/stocks/settlement-report',
    )

  return response
}