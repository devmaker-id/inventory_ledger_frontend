import { api } from '@/lib/api/axios'

export async function getProfile() {
  const response = await api.get(
    '/auth/profile',
  )

  return response.data.data
}