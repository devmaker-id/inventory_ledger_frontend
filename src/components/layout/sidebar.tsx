'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  useEffect,
  useState,
} from 'react'

import {
  LogOut,
} from 'lucide-react'

import { getProfile } from '@/services/auth.service'
import { menus } from '@/config/menus'


import { logout } from '@/lib/auth'

export function Sidebar({
    onNavigate,
  }: {
    onNavigate?: () => void
  }) {
  const pathname = usePathname()

  const [profile, setProfile] =
  useState<any>(null)

  const filteredMenus = menus.filter(
    (menu) =>
      menu.roles.includes(
        profile?.role,
      ),
  )

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          await getProfile()

        setProfile(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProfile()
  }, [])

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">
          Inventory Ledger
        </h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        {filteredMenus.map((menu) => {
          const Icon = menu.icon

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${ pathname === menu.href ? 'bg-black text-white' : 'hover:bg-muted'}`}
              onClick={onNavigate}
            >
              <Icon className="h-5 w-5" />

              {menu.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <div className="mb-4">
          <p className="text-sm font-semibold">
            {profile?.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {profile?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />

          Logout
        </button>
      </div>
    </aside>
  )
}