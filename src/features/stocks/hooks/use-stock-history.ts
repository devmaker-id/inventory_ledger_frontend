'use client'

import { useQuery } from '@tanstack/react-query'

import { getStockHistory } from '../api/get-stock-history'

export function useStockHistory(
  userId?: number
) {
  return useQuery({
    queryKey: ['stock-history', userId],
    queryFn: () => getStockHistory(userId!),
    enabled: !!userId
  })
}