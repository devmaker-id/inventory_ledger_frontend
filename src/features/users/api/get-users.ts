import { http } from '@/core/http'

import type { UsersResponse } from '../types/user.types'

type GetUserParams = {
  page?: number
  limit?: number
  search?: string
}

export function getUsers(
  params: GetUserParams
) {
  return http.get<UsersResponse>('/users', {
    params
  })
}