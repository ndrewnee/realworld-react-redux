export type User = {
  username: string
  image?: string
}

export type UserResponse = {
  user: User
}

export type UserLoginRequest = {
  email: string
  password: string
}
