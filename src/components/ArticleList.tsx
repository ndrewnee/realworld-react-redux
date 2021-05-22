import ArticlePreview from 'components/ArticlePreview'
import ListPagination from 'components/ListPagination'
import { Article } from 'models/article'
import React from 'react'

interface Props {
  articles: Article[]
  articlesCount: number
  currentPage: number
  pager?: (page: number) => void
}

const ArticleList: React.FC<Props> = (props) => {
  if (!props.articles) {
    return <div className="article-preview">Loading...</div>
  }

  if (props.articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>
  }

  return (
    <div>
      {props.articles.map((article) => {
        return <ArticlePreview article={article} key={article.slug} />
      })}

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
      />
    </div>
  )
}

export default React.memo(ArticleList)
