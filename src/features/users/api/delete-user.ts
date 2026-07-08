import { http } from '@/core/http'

export function deleteUser(id: number) {
  return http.delete(`/users/${id}`)
}