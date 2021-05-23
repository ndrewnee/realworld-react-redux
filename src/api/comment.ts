import { User } from 'api/user'

export interface Comment {
  id: string
  body: string
  createdAt: string
  author: User
}
