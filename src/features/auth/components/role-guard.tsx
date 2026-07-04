'use client'

import { ReactNode } from 'react'

import { useAuthStore } from '@/store/auth.store'
import type { UserRole } from '@/types/auth'

type RoleGuardProps = {
  roles: UserRole[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleGuard({
  roles,
  children,
  fallback = null,
}: RoleGuardProps) {
  const { user } = useAuthStore()

  if (!user) {
    return fallback
  }

  if (!roles.includes(user.role)) {
    return fallback
  }

  return <>{children}</>
}