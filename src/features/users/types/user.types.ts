import { User } from "@/types/user"

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone?: string
  address?: string
  roleId: number
  parentId?: number | null
}

export interface UsersResponse {
  data: User[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}