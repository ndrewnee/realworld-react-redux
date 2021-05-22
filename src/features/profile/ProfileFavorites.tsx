import { favoritesPageLoad } from 'features/profile/profileSlice'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProfileGeneral from './ProfileGeneral'

type Props = {
  pager: (page: number) => void
  currentPage: number
} & RouteComponentProps<{
  username: string
}>

const ProfileFavorites: React.FC<Props> = (props) => {
  return <ProfileGeneral isFavorite={true} pageLoad={favoritesPageLoad} {...props} />
}

export default ProfileFavorites
