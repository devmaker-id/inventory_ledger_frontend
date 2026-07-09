import { useQuery } from '@tanstack/react-query'

import { getSettlementDetail } from '../api/get-settlement-detail'

export function useSettlementDetail(
  distributorId?: number,
) {
  return useQuery({
    queryKey: [
      'settlement-detail',
      distributorId,
    ],

    queryFn: () =>
      getSettlementDetail(
        distributorId!,
      ),

    enabled: !!distributorId,
  })
}