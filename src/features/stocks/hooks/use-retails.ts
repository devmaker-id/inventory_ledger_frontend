'use client'

import { useQuery } from '@tanstack/react-query'

import { getRetails } from '../api/get-retails'

export function useRetails(
  parentId?: number,
) {
  return useQuery({
    queryKey: [
      'retails',
      parentId,
    ],

    queryFn: () =>
      getRetails(parentId!),

    enabled: !!parentId,
  })
}