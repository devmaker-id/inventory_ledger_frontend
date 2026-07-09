import { useQuery } from '@tanstack/react-query'

import { getTopProducts } from '../api/get-top-products'

export function useTopProducts() {
  return useQuery({
    queryKey: ['top-products'],
    queryFn: getTopProducts,
  })
}