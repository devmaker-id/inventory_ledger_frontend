'use client'

import {
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'

import { getProfile } from '../api/profile'

import { useAuthStore } from '@/store/auth.store'

export function AuthInitializer({
  children,
}: PropsWithChildren) {
  const {
    token,
    setUser,
    logout,
  } = useAuthStore()

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    const initialize = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response =
          await getProfile()

        setUser(response.data)
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [token, setUser, logout])

  if (loading) {
    return null
  }

  return children
}