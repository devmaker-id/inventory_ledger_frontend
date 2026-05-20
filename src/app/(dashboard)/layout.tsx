'use client'

import {
  useEffect,
  useState,
} from 'react'

import { Menu } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'

import {
  usePathname,
  useRouter
} from 'next/navigation'
import { Sidebar } from '@/components/layout/sidebar'
import { isAuthenticated } from '@/lib/auth'


import { getProfile } from '@/services/auth.service'
import { menus } from '@/config/menus'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [authorized, setAuthorized] =
    useState(false)
  
  const [open, setOpen] =
  useState(false)

  const pathname = usePathname()

  useEffect(() => {
  const checkAccess = async () => {
    const authenticated =
      isAuthenticated()

    if (!authenticated) {
      router.replace('/login')

      return
    }

    try {
      const profile =
        await getProfile()

      const currentMenu =
        menus.find(
          (menu) =>
            menu.href === pathname,
        )

      if (!currentMenu) {
        router.replace('/dashboard')

        return
      }

      const allowed =
        currentMenu.roles.includes(
          profile.role,
        )

      if (!allowed) {
        router.replace('/dashboard')

        return
      }

      setAuthorized(true)
    } catch (error) {
      console.error(error)

      router.replace('/login')
    }
  }

  checkAccess()
}, [pathname, router])

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

return (
  <div className="flex min-h-screen bg-muted/30">
    <div className="hidden md:block">
      <Sidebar />
    </div>

    <div className="flex flex-1 flex-col">
      <div className="flex h-16 items-center border-b bg-white px-4 md:hidden">
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger asChild>
            <button>
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="p-0"
          >
            <SheetTitle className="sr-only">
              Navigation Menu
            </SheetTitle>

            <Sidebar
              onNavigate={() =>
                setOpen(false)
              }
            />
          </SheetContent>
        </Sheet>

        <h1 className="ml-4 text-lg font-semibold">
          Inventory Ledger
        </h1>
      </div>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  </div>
)
}