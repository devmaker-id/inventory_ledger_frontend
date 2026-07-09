import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

import { returnStock } from '../api/return-stock'

export function useReturnStock() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: returnStock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-stocks'],
      })

      queryClient.invalidateQueries({
        queryKey: [
          'stock-history',
        ],
      })
    },
  })
}