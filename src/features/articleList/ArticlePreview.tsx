import { Article } from 'api/article'
import { useAppDispatch } from 'app/hooks'
import { favoriteArticle, unfavoriteArticle } from './articleListSlice'
import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

interface Props {
  article: Article
}

const ArticlePreview: React.FC<Props> = ({ article }) => {
  const dispatch = useAppDispatch()

  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault()
    if (article.favorited) {
      dispatch(unfavoriteArticle(article.slug))
    } else {
      dispatch(favoriteArticle(article.slug))
    }
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img
            src={
              article.author.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'
            }
            alt={article.author.username}
          />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">{new Date(article.createdAt).toDateString()}</span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            )
          })}
        </ul>
      </Link>
    </div>
  )
}

export default React.memo(ArticlePreview)
