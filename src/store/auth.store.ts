'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AuthUser } from '@/types/auth'

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setToken: (token: string | null) => void
  setUser: (user: AuthUser | null) => void
  logout: () => void
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      (set) => ({
        token: null,

        user: null,

        isAuthenticated: false,

        setToken: (token) =>
          set({
            token,
            isAuthenticated: !!token,
          }),

        setUser: (user) =>
          set({
            user,
          }),

        logout: () =>
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: 'auth-storage',
      },
    ),
  )