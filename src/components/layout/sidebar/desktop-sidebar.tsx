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
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          Inventory Ledger
        </h1>
      </div>

      <SidebarContent
        menus={filteredMenus}
        onNavigate={onNavigate}
      />

      <SidebarFooter />
    </aside>
  )
}