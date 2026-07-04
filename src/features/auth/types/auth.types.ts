export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  role: 'OWNER' | 'DISTRIBUTOR' | 'RETAIL'
}

export interface ProfileResponse {
  user: AuthUser
}