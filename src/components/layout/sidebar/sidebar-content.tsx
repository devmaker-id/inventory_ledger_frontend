'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { menus } from '@/config/menus'

type SidebarContentProps = {
  menus: typeof menus
  onNavigate?: () => void
}

export function SidebarContent({
  menus,
  onNavigate,
}: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-1 flex-col gap-2 p-4">
      {menus.map((menu) => {
        const Icon = menu.icon

        const isActive =
          pathname === menu.href

        return (
          <Link
            key={menu.href}
            href={menu.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? 'bg-black text-white'
                : 'hover:bg-muted'
            }`}
          >
            <Icon className="h-5 w-5" />

            <span>{menu.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}