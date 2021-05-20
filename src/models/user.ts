export type User = {
  username: string
  email: string
  bio: string | null
  image: string | null
  token: string
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

export type SaveUserRequest = {
  username: string
  email: string
  password?: string
  bio?: string
  image?: string
}

export type SaveUserResponse = {
  user?: User
  errors?: {
    [k: string]: string
  }
}
