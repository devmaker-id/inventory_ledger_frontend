'use client'

import { menus } from '@/config/menus'
import { useAuthStore } from '@/store/auth.store'

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'

import { SidebarContent } from './sidebar-content'
import { SidebarFooter } from './sidebar-footer'

type MobileSidebarProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSidebar({
  open,
  onOpenChange,
}: MobileSidebarProps) {
  const { user } = useAuthStore()

  const filteredMenus = user
    ? menus.filter((menu) =>
        menu.roles.includes(user.role),
      )
    : []

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="left"
        className="flex w-64 flex-col p-0 lg:hidden"
      >
        <div className="border-b p-6">
          <h1 className="text-xl font-bold">
            Inventory Ledger
          </h1>
        </div>

        <SidebarContent
          menus={filteredMenus}
          onNavigate={() =>
            onOpenChange(false)
          }
        />

        <SidebarFooter />
      </SheetContent>
    </Sheet>
  )
}