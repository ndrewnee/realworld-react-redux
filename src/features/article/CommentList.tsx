import { useAppSelector } from 'app/hooks'
import Comment from './Comment'
import React from 'react'
import { selectArticle } from './articleSlice'

const CommentList: React.FC<{}> = () => {
  const { comments } = useAppSelector(selectArticle)

  return (
    <div>
      {comments.map((comment) => {
        return <Comment comment={comment} key={comment.id} />
      })}
    </div>
  )
}

export default React.memo(CommentList)
