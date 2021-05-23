import { AsyncThunk } from '@reduxjs/toolkit'
import { ArticleListResponse } from 'api/article'
import { Profile, ProfileResponse } from 'api/profile'
import { selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ArticleList from 'features/articleList/ArticleList'
import { followUser, selectProfile, unfollowUser } from './profileSlice'
import React, { MouseEventHandler, NamedExoticComponent, useEffect } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

const EditProfileSettings: NamedExoticComponent<{ isUser: boolean }> = React.memo((props) => {
  if (props.isUser) {
    return (
      <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    )
  }

  return null
})

const FollowUserButton: NamedExoticComponent<{
  isUser: boolean
  user: Profile
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

type Props = {
  pageLoad: AsyncThunk<[ProfileResponse, ArticleListResponse], string, {}>
  isFavorite?: boolean
} & RouteComponentProps<{
  username: string
}>

const ProfileGeneral: React.FC<Props> = ({ match, pageLoad, isFavorite }) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(selectApp)
  const { profile } = useAppSelector(selectProfile)

  const onFollow = (username: string) => {
    dispatch(followUser(username))
  }

  const onUnfollow = (username: string) => {
    dispatch(unfollowUser(username))
  }

  useEffect(() => {
    dispatch(pageLoad(match.params.username))
  }, [dispatch, pageLoad, match.params.username])

  if (!profile) {
    return null
  }

  const isUser = currentUser ? profile.username === currentUser.username : false

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
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={isFavorite ? 'nav-link' : 'nav-link active'}
                    to={`/@${profile.username}`}
                  >
                    My Articles
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={isFavorite ? 'nav-link active' : 'nav-link'}
                    to={`/@${profile.username}/favorites`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <ArticleList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileGeneral
