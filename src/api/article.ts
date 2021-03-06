import { User } from 'api/user'

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: User
  createdAt: string
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

export interface ArticleListResponse {
  articles: Article[]
  articlesCount: number
}
