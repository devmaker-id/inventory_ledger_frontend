'use client'

import { useQuery } from '@tanstack/react-query'

import { getSales } from '../api/get-sales'

export function useSales(
  userId?: number
) {
  return useQuery({
    queryKey: ['sales', userId],
    queryFn: () => getSales(userId!),
    enabled: !!userId
  })
}