'use client'

import { DesktopSidebar } from './desktop-sidebar'
import { MobileSidebar } from './mobile-sidebar'

type SidebarProps = {
  mobileOpen: boolean
  onMobileOpenChange: (
    open: boolean,
  ) => void
}

export function Sidebar({
  mobileOpen,
  onMobileOpenChange,
}: SidebarProps) {
  return (
    <>
      <DesktopSidebar />

      <MobileSidebar
        open={mobileOpen}
        onOpenChange={
          onMobileOpenChange
        }
      />
    </>
  )
}