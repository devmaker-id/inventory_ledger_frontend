import { create } from 'zustand'

import { AuthUser } from '@/types/auth'

type AuthStore = {
  user: AuthUser | null

  setUser: (user: AuthUser) => void

  logout: () => void
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,

    setUser: (user) =>
      set({
        user,
      }),

    logout: () => {
      localStorage.removeItem('token')

      set({
        user: null,
      })

      window.location.href = '/login'
    },
  }))