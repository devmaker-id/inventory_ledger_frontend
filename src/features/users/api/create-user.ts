import { http } from '@/core/http'

import type { User } from '@/types/user'
import type { CreateUserRequest } from '../types/user.types'

export function createUser(
  body: CreateUserRequest,
) {
  return http.post<User, CreateUserRequest>(
    '/users',
    body,
  )
}