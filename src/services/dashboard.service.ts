import { api } from '@/lib/api/axios'

export async function getDashboardStats() {
//   const response = await api.get(
//     '/dashboard/stats',
//   )

//   return response.data.data
    return {
    totalInventory: 1240,
    totalRetail: 32,
    totalDistributor: 8,
    totalTransactions: 12480,
    }
}