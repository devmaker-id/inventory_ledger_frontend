'use client'

import { menus } from '@/config/menus'
import { useAuthStore } from '@/store/auth.store'

import { SidebarContent } from './sidebar-content'
import { SidebarFooter } from './sidebar-footer'

type DesktopSidebarProps = {
  onNavigate?: () => void
}

export function DesktopSidebar({
  onNavigate,
}: DesktopSidebarProps) {
  const { user } = useAuthStore()

  const filteredMenus = user
    ? menus.filter((menu) =>
        menu.roles.includes(user.role),
      )
    : []

  return (
    <aside className="fixed
    inset-y-0
    left-0
    z-40
    hidden
    w-64
    border-r
    bg-background
    lg:flex
    lg:flex-col">
      <div className="shrink-0 border-b p-4">
        <h1 className="text-xl font-bold">
          Inventory Ledger
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarContent
          menus={filteredMenus}
          onNavigate={onNavigate}
        />
      </div>

      <div className="shrink-0 border-t">
        <SidebarFooter />
      </div>
    </aside>
  )
}