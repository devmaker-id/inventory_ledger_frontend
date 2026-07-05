'use client'

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { updateUser } from '../api/update-user'

export function useUpdateUser() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number
      data: any
    }) =>
      updateUser(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}