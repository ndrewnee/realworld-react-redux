import { useAppSelector } from 'app/hooks'
import { selectArticle } from './articleSlice'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import ArticleActions from './ArticleActions'

const ArticleMeta: React.FC<{}> = () => {
  const { article } = useAppSelector(selectArticle)

  if (!article) {
    return null
  }

  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img
          src={article.author.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'}
          alt={article.author.username}
        />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{new Date(article.createdAt).toDateString()}</span>
      </div>

      <ArticleActions />
    </div>
  )
}

export default memo(ArticleMeta)
