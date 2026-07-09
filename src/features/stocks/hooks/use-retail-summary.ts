import { useQuery } from '@tanstack/react-query'

import { getRetailSummary } from '../api/get-retail-summary'

export function useRetailSummary() {
  return useQuery({
    queryKey: ['retail-summary'],
    queryFn: getRetailSummary,
  })
}