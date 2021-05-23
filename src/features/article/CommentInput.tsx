import { selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { addComment, selectArticle } from './articleSlice'

const CommentInput: React.FC<{}> = () => {
  const dispatch = useAppDispatch()

  const [body, setBody] = useState('')
  const { currentUser } = useAppSelector(selectApp)
  const { article } = useAppSelector(selectArticle)

  const createComment: FormEventHandler = (event) => {
    event.preventDefault()
    dispatch(addComment({ slug: article!.slug, body }))
    setBody('')
  }

  const changeBody: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setBody(event.target.value)
  }

  return (
    <form className="card comment-form" onSubmit={createComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          value={body}
          onChange={changeBody}
          rows={3}
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={currentUser?.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'}
          className="comment-author-img"
          alt={currentUser?.username}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  )
}

export default React.memo(CommentInput)
