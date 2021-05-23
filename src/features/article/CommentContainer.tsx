import { selectApp } from 'app/appSlice'
import { useAppSelector } from 'app/hooks'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import React from 'react'
import { Link } from 'react-router-dom'
import { selectArticle } from './articleSlice'
import ListErrors from 'components/ListErrors'

const CommentContainer: React.FC<{}> = () => {
  const { currentUser } = useAppSelector(selectApp)
  const { errors } = useAppSelector(selectArticle)

  if (currentUser) {
    return (
      <div className="col-xs-12 col-md-8 offset-md-2">
        <div>
          <ListErrors errors={errors}></ListErrors>
          <CommentInput />
        </div>

        <CommentList />
      </div>
    )
  }

  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      <p>
        <Link to="/login">Sign in</Link>
        &nbsp;or&nbsp;
        <Link to="/register">sign up</Link>
        &nbsp;to add comments on this article.
      </p>

      <CommentList />
    </div>
  )
}

export default React.memo(CommentContainer)
