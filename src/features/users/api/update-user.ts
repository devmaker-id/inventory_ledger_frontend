import { http } from '@/core/http'

import type { User } from '@/types/user'

import type { CreateUserSchema } from '../schemas/create-user.schema'

export function updateUser(
  id: number,
  data: CreateUserSchema,
) {
  return http.put<User>(
    `/users/${id}`,
    data,
  )
}