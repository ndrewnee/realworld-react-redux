export interface Article {
  slug?: string
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface GetArticleResponse {
  article?: Article
  errors?: {
    [k: string]: string
  }
}
