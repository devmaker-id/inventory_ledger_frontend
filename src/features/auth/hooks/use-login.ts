'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import { login } from '../api/login'

export function useLogin() {
  const router = useRouter()

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

      const response = await login({
        email,
        password,
      })

      localStorage.setItem(
        'token',
        response.data.token,
      )

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