import { Comment } from 'api/comment'
import { selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React from 'react'
import { deleteComment, selectArticle } from './articleSlice'

interface Props {
  comment: Comment
}

const DeleteButton: React.FC<Props> = ({ comment }) => {
  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector(selectApp)
  const { article } = useAppSelector(selectArticle)

  const del = () => {
    dispatch(deleteComment({ slug: article!.slug, commentId: comment.id }))
  }

  const show = currentUser && currentUser.username === comment.author.username

  if (!show) {
    return null
  }

  return (
    <span className="mod-options">
      <i className="ion-trash-a" onClick={del}></i>
    </span>
  )
}

export default React.memo(DeleteButton)
