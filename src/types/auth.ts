export type UserRole =
  | 'OWNER'
  | 'DISTRIBUTOR'
  | 'RETAIL'

export type AuthUser = {
  id: number
  name: string
  email: string
  role: UserRole
  parentId: number | null
}