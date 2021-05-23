import { favoritesPageLoad } from './profileSlice'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProfileGeneral from './ProfileGeneral'

type Props = RouteComponentProps<{ username: string }>

const ProfileFavorites: React.FC<Props> = (props) => {
  return <ProfileGeneral isFavorite={true} pageLoad={favoritesPageLoad} {...props} />
}

export default ProfileFavorites
