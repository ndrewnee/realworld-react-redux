import { selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { deleteArticle, selectArticle } from './articleSlice'
import React from 'react'
import { Link } from 'react-router-dom'

const ArticleActions: React.FC<{}> = () => {
  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector(selectApp)
  const { article } = useAppSelector(selectArticle)

  if (!article) {
    return <span></span>
  }

  const canModify = currentUser && currentUser.username === article.author.username

  if (!canModify) {
    return <span></span>
  }

  const del = () => {
    dispatch(deleteArticle(article.slug))
  }

  return (
    <span>
      <Link to={`/editor/${article.slug}`} className="btn btn-outline-secondary btn-sm">
        <i className="ion-edit"></i> Edit Article
      </Link>

      <button className="btn btn-outline-danger btn-sm" onClick={del}>
        <i className="ion-trash-a"></i> Delete Article
      </button>
    </span>
  )
}

export default React.memo(ArticleActions)
