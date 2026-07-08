import {
  Boxes,
  UsersRound,
  LayoutDashboard,
  ScrollText,
  ChartColumn,
  User,
  ShoppingCart,
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