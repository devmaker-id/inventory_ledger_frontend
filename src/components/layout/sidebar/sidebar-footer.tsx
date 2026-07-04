'use client'

import { useRouter } from 'next/navigation'

import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store'

export function SidebarFooter() {
  const router = useRouter()

  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  return (
    <div className="border-t p-4">
      <div className="mb-4">
        <p className="text-sm font-semibold">
          {user?.name}
        </p>

        <p className="text-xs text-muted-foreground">
          {user?.role}
        </p>
      </div>

      <Button
        variant="ghost"
        onClick={handleLogout}
        className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
      >
        <LogOut className="mr-2 h-4 w-4" />

        Logout
      </Button>
    </div>
  )
}