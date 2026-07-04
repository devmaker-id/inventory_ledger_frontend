'use client'

import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

type TopbarProps = {
  onOpenSidebar: () => void
}

export function Topbar({
  onOpenSidebar,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-lg font-semibold">
            Inventory Ledger
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Topbar Profile */}
      </div>
    </header>
  )
}