import { http } from '@/core/http'

import type { User } from '@/types/user'

export function getUser(id: number) {
  return http.get<User>(`/users/${id}`)
}