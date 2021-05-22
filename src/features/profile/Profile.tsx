import { pageLoad } from 'features/profile/profileSlice'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ProfileGeneral from './ProfileGeneral'

type Props = {
  pager: (page: number) => void
  currentPage: number
} & RouteComponentProps<{
  username: string
}>

const Profile: React.FC<Props> = (props) => {
  return <ProfileGeneral pageLoad={pageLoad} {...props} />
}

export default Profile
