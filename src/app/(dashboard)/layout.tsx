'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AppLayout } from '@/components/layout/app-layout'
import { AuthInitializer } from '@/features/auth/components/auth-initializer'
import { isAuthenticated } from '@/lib/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [authorized, setAuthorized] =
    useState(false)

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login')

      return
    }

    setAuthorized(true)
  }, [router])

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <AuthInitializer>
      <AppLayout>{children}</AppLayout>
    </AuthInitializer>
  )
}