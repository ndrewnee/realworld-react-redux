import { User } from 'api/user'

export interface Comment {
  id: string
  body: string
  createdAt: string
  author: User
}

export interface CommentListResponse {
  comments: Comment[]
}

export interface CommentResponse {
  comment?: Comment
  errors?: {
    [k: string]: string
  }
}
