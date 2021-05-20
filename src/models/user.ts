export type User = {
  username: string
  token: string
  image: string | null
}

export type GetUserResponse = {
  user: User
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  user?: User
  errors?: {
    [k: string]: string
  }
}

export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type RegisterResponse = {
  user?: User
  errors?: {
    [k: string]: string
  }
}
