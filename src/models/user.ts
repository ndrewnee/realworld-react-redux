export type User = {
  username: string
  image?: string
  token?: string
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
