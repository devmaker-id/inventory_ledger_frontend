'use client'

import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../api/get-users'

type UseUserParams = {
  page?: number
  limit?: number
  search?: string
}

export function useUsers(
  params: UseUserParams
) {
  const query = useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  })
  
  return query
}