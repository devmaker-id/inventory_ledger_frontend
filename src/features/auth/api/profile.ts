import { api } from '@/lib/api/axios'

import type { ApiResponse } from '@/types/api'
import type { AuthUser } from '@/types/auth'

export async function getProfile() {
  const response =
    await api.get<ApiResponse<AuthUser>>(
      '/auth/profile',
    )

  return response.data
}