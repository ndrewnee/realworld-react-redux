import { selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ArticleList from 'features/articleList/ArticleList'
import {
  followUser,
  pageLoad,
  pageUnload,
  selectProfile,
  unfollowUser,
} from 'features/profile/profileSlice'
import { Article } from 'models/article'
import { Profile as ProfileModel } from 'models/profile'
import React, { MouseEventHandler, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

const EditProfileSettings: React.NamedExoticComponent<{ isUser: boolean }> = React.memo((props) => {
  if (props.isUser) {
    return (
      <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    )
  }

  return null
})

const FollowUserButton: React.NamedExoticComponent<{
  isUser: boolean
  user: ProfileModel
  follow: (username: string) => void
  unfollow: (username: string) => void
}> = React.memo(({ isUser, user, follow, unfollow }) => {
  if (isUser) {
    return null
  }

  let classes = 'btn btn-sm action-btn'
  if (user.following) {
    classes += ' btn-secondary'
  } else {
    classes += ' btn-outline-secondary'
  }

  const handleClick: MouseEventHandler = (event) => {
    event.preventDefault()
    if (user.following) {
      unfollow(user.username)
    } else {
      follow(user.username)
    }
  }

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {user.following ? 'Unfollow' : 'Follow'} {user.username}
    </button>
  )
})

interface Props {
  pager: (page: number) => void
  articles: Article[]
  articlesCount: number
  currentPage: number
}

interface MatchParams {
  username: string
}

const Profile: React.FC<Props & RouteComponentProps<MatchParams>> = ({
  match,
  pager,
  articles,
  articlesCount,
  currentPage,
}) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(selectApp)

  const onFollow = (username: string) => {
    dispatch(followUser(username))
  }

  const onUnfollow = (username: string) => {
    dispatch(unfollowUser(username))
  }

  useEffect(() => {
    dispatch(pageLoad(match.params.username))
  }, [dispatch, match.params.username])

  useEffect(() => {
    return () => {
      dispatch(pageUnload())
    }
  }, [dispatch])

  const { profile } = useAppSelector(selectProfile)

  if (!profile) {
    return null
  }

  const isUser = currentUser ? profile.username === currentUser.username : false

  const renderTabs = () => {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link className="nav-link active" to={`/@${profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to={`/@${profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={profile.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                className="user-img"
                alt={profile.username}
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>

              <EditProfileSettings isUser={isUser} />
              <FollowUserButton
                isUser={isUser}
                user={profile}
                follow={onFollow}
                unfollow={onUnfollow}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">{renderTabs()}</div>

            <ArticleList
              pager={pager}
              articles={articles}
              articlesCount={articlesCount}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
