'use client'

import { useQuery } from '@tanstack/react-query'

import { getUserStocks } from '../api/get-user-stocks'

export function useUserStocks(
  userId?: number,
) {
  return useQuery({
    queryKey: [
      'user-stocks',
      userId,
    ],

    queryFn: () =>
      getUserStocks(userId!),

    enabled: !!userId,
  })
}