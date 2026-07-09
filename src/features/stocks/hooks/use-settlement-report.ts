import { useQuery } from '@tanstack/react-query'

import { getSettlementReport } from '../api/get-settlement-report'

export function useSettlementReport() {
  return useQuery({
    queryKey: ['settlement-report'],
    queryFn: getSettlementReport,
  })
}