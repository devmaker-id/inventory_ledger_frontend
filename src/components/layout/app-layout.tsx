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
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onOpenSidebar={() =>
            setMobileOpen(true)
          }
        />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}