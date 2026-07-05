'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { ApiError } from '@/core/http'
import { createUser } from '../api/create-user'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,

    onSuccess: () => {
      toast.success('User berhasil dibuat')

      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },

    onError: (error) => {
      if (error instanceof ApiError) {
        toast.error(error.message)

        return
      }

      toast.error(
        'Terjadi kesalahan',
      )
    },
  })
}