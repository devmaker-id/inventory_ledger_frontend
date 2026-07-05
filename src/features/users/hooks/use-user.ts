'use client'

import { useQuery } from '@tanstack/react-query'

import { getUser } from '../api/get-user'

export function useUser(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  })
}