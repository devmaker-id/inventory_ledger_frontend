import { useAuthStore } from '@/store/auth.store'

export function getToken() {
  if (typeof window === 'undefined') {
    return null
  }

  return useAuthStore.getState().token
}

export function isAuthenticated() {
  return !!getToken()
}

export function logout() {
  useAuthStore.getState().logout()

  window.location.href = '/login'
}