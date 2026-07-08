'use client'

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { saleStock } from '../api/sale-stock'

export function useSaleStock() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: saleStock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-stocks'],
      })

      queryClient.invalidateQueries({
        queryKey: ['stock-history'],
      })

      queryClient.invalidateQueries({
        queryKey: ['sales'],
      })

      queryClient.invalidateQueries({
        queryKey: ['sales-summary'],
      })
    },
  })
}