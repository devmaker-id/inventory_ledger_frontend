import { api } from '@/lib/api/axios'

import type {
  LoginRequest,
  LoginResponse,
} from '../types/auth.types'

type LoginApiResponse = {
  success: boolean
  message: string
  data: LoginResponse
}

export async function login(
  payload: LoginRequest,
) {
  const response =
    await api.post<LoginApiResponse>(
      '/auth/login',
      payload,
    )

  return response.data
}