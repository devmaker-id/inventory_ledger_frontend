'use client'

import { useState } from 'react'

import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

type AppLayoutProps = {
  children: React.ReactNode
}

export function AppLayout({
  children,
}: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] =
    useState(false)

  return (
    <div className="h-screen overflow-hidden bg-muted/30">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

      <div className="flex h-screen flex-col lg:ml-64">
        <Topbar
          onOpenSidebar={() =>
            setMobileOpen(true)
          }
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}