import { User } from './user'

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: User
  createdAt: Date
}

export interface ArticleResponse {
  article?: Article
  errors?: {
    [k: string]: string
  }
}

export interface ArticleEdit {
  slug?: string
  title: string
  description: string
  body: string
  tagList: string[]
}
