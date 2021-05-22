export interface Article {
  slug?: string
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface ArticleResponse {
  article?: Article
  errors?: {
    [k: string]: string
  }
}
