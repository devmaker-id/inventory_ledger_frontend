'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { login } from '../api/login'
import { useAuthStore } from '@/store/auth.store'
import { getProfile } from '../api/profile'

export function useLogin() {
  const router = useRouter()
  const { setToken, setUser } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      const loginResponse = await login({
        email,
        password,
      })
      setToken(loginResponse.data.token)
      const profile = await getProfile()
      setUser(profile.data)

      router.push('/dashboard')
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          'Login failed',
      )
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    password,
    loading,
    error,

    setEmail,
    setPassword,

    handleSubmit,
  }
}