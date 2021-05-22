import ArticlePreview from 'features/articleList/ArticlePreview'
import ListPagination from 'features/articleList/ListPagination'
import { Article } from 'models/article'
import React from 'react'

interface Props {
  articles: Article[]
  articlesCount: number
  currentPage: number
  pager?: (page: number) => void
}

const ArticleList: React.FC<Props> = ({ articles, articlesCount, currentPage, pager }) => {
  if (!articles) {
    return <div className="article-preview">Loading...</div>
  }

  if (articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>
  }

  return (
    <div>
      {articles.map((article) => {
        return <ArticlePreview article={article} key={article.slug} />
      })}

      <ListPagination pager={pager} articlesCount={articlesCount} currentPage={currentPage} />
    </div>
  )
}

export default React.memo(ArticleList)
