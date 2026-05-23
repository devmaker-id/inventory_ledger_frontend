import { api } from '@/lib/api/axios'

export async function getSummary() {
  const response = await api.get(
    '/analytics/summary',
  )

  return response.data.data
}

export async function getLowStock() {
  const response = await api.get(
    '/analytics/low-stock',
  )

  return response.data.data
}

export async function getRecentTransactions() {
  const response = await api.get(
    '/analytics/recent-transactions',
  )

  return response.data.data
}