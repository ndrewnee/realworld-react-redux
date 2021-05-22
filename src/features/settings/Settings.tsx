import agent from 'api/agent'
import { logout } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ListErrors from 'components/ListErrors'
import { saveUser, selectSettings } from 'features/settings/settingsSlice'
import SettingsForm from 'features/settings/SettingsForm'
import { SaveUserRequest } from 'models/user'
import React, { FC, MouseEventHandler } from 'react'

const Settings: FC = () => {
  const dispatch = useAppDispatch()
  const { errors } = useAppSelector(selectSettings)

  const onSubmitForm = (user: SaveUserRequest) => dispatch(saveUser(user))

  const clickLogout: MouseEventHandler = () => {
    window.localStorage.removeItem('jwt')
    agent.setToken(null)
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
