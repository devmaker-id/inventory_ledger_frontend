export const RoleId = {
  OWNER: 1,
  DISTRIBUTOR: 2,
  RETAIL: 3,
} as const

export const ROLES = {
  OWNER: 'OWNER',
  DISTRIBUTOR: 'DISTRIBUTOR',
  RETAIL: 'RETAIL',
} as const

export const ROLE_ROUTES = {
  OWNER: [
    '/users',
    '/dashboard',
    '/inventory',
    '/ledger',
    '/analytics',
  ],

  DISTRIBUTOR: [
    '/dashboard',
    '/inventory',
    '/ledger',
  ],

  RETAIL: [
    '/dashboard',
    '/inventory',
  ],
}