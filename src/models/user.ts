export interface User {
  username: string
  email: string
  bio: string | null
  image: string | null
  token: string
}

export interface UserResponse {
  user?: User
  errors?: {
    [k: string]: string
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface SaveUserRequest {
  username: string
  email: string
  password?: string
  bio?: string
  image?: string
}
