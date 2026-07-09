import {
  Boxes,
  UsersRound,
  LayoutDashboard,
  ScrollText,
  ChartColumn,
  User,
  ShoppingCart,
  Wallet,
  Replace,
  FileEdit,
} from 'lucide-react'

import { ROLES } from '@/lib/roles'

export const menus = [
  {
    label: 'User Management',
    href: '/users',
    icon: UsersRound,
    roles: [
      ROLES.OWNER,
    ],
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
      ROLES.RETAIL,
    ],
  },
  {
    label: 'Adjusment Stok',
    href: '/adjustment',
    icon: FileEdit,
    roles: [
      ROLES.OWNER,
    ],
  },
  {
    label: 'Retu Stok',
    href: '/return',
    icon: Replace,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
      ROLES.RETAIL,
    ],
  },
  {
    label: 'Settlement',
    href: '/settlement',
    icon: Wallet,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
      ROLES.RETAIL,
    ],
  },
  {
    label: 'Summary',
    href: '/summary',
    icon: Boxes,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
      ROLES.RETAIL,
    ],
  },
  {
    label: 'Inventory',
    href: '/inventory',
    icon: Boxes,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
      ROLES.RETAIL,
    ],
  },
  {
    label: 'Sales',
    href: '/sales',
    icon: ShoppingCart,
    roles: [
      ROLES.RETAIL,
      ROLES.DISTRIBUTOR,
    ],
  },
  {
    label: 'Stocks',
    href: '/stocks',
    icon: Boxes,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
    ],
  },
  {
    label: 'Ledger',
    href: '/ledger',
    icon: ScrollText,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
    ],
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: ChartColumn,
    roles: [ROLES.OWNER],
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: User,
    roles: [
      ROLES.OWNER,
      ROLES.DISTRIBUTOR,
      ROLES.RETAIL,
    ],
  },
]