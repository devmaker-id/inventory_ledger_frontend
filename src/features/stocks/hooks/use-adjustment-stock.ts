import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

import { adjustmentStock } from '../api/adjustment-stock'

export function useAdjustmentStock() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: adjustmentStock,

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