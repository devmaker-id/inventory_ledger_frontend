export const ROLES = {
  OWNER: 'OWNER',
  DISTRIBUTOR: 'DISTRIBUTOR',
  RETAIL: 'RETAIL',
} as const

export const ROLE_ROUTES = {
  OWNER: [
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