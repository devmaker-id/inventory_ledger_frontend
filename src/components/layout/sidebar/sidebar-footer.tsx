'use client'

import { useRouter } from 'next/navigation'

import {
  ChevronUp,
  LogOut,
  User,
} from 'lucide-react'

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAuthStore } from '@/store/auth.store'

export function SidebarFooter() {
  const router = useRouter()

  const {
    user,
    logout,
  } = useAuthStore()

  function handleLogout() {
    logout()
    router.replace('/login')
  }
  const handleProfile = () => {
    router.push('/profile')
  }

  const initials =
    user?.name
      ?.split(' ')
      .map((item) => item[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ?? 'U'

  return (
    <div className="border-t p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-full justify-between px-2 py-2"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium">
                  {user?.name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {user?.role}
                </p>
              </div>
            </div>

            <ChevronUp className="h-4 w-4 shrink-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="start"
          className="w-60"
        >
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">
                {user?.name}
              </span>

              <span className="text-xs text-muted-foreground">
                {user?.role}
              </span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleProfile}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}