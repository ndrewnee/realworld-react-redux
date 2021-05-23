import { Comment } from 'api/comment'
import React from 'react'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

interface Props {
  comment: Comment
}

const CommentComponent: React.FC<Props> = ({ comment }) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={
              comment.author.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'
            }
            className="comment-author-img"
            alt={comment.author.username}
          />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">{new Date(comment.createdAt).toDateString()}</span>
        <DeleteButton comment={comment} />
      </div>
    </div>
  )
}

export default React.memo(CommentComponent)
