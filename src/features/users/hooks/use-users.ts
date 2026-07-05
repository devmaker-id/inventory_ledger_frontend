'use client'

import { useQuery } from '@tanstack/react-query'

import { getUsers } from '../api/get-users'

export function useUsers() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

//   console.log('useUsers query', query)

  return query
}