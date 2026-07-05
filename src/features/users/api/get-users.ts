import { http } from '@/core/http'

import type { UsersResponse } from '../types/user.types'

export function getUsers() {
  return http.get<UsersResponse>('/users')
}