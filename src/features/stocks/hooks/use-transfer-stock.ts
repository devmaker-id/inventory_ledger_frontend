'use client'

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { transferStock } from '../api/transfer-stock'

export function useTransferStock() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: transferStock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-stocks'],
      })

      queryClient.invalidateQueries({
        queryKey: ['stock-history'],
      })
    },
  })
}