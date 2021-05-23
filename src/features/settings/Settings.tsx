import api from 'api'
import { SaveUserRequest } from 'api/user'
import { logout } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ListErrors from 'components/ListErrors'
import SettingsForm from './SettingsForm'
import { saveUser, selectSettings } from './settingsSlice'
import React, { MouseEventHandler } from 'react'

const Settings: React.FC = () => {
  const dispatch = useAppDispatch()
  const { errors } = useAppSelector(selectSettings)

  const onSubmitForm = (user: SaveUserRequest) => dispatch(saveUser(user))

  const clickLogout: MouseEventHandler = () => {
    window.localStorage.removeItem('jwt')
    api.setToken(null)
    dispatch(logout())
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors} />

            <SettingsForm onSubmitForm={onSubmitForm} />

            <hr />

            <button className="btn btn-outline-danger" onClick={clickLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
