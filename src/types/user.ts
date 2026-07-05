export type Role = {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string | null
  address: string | null
  roleId: number
  role: Role
  parentId: number | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}