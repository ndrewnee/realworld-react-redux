import agent from 'api/agent'
import { logout, selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import ListErrors from 'components/ListErrors'
import { saveUser, selectSettings, pageUnload } from 'features/settings/settingsSlice'
import { SaveUserRequest } from 'models/user'
import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'

type SettingsFormProps = {
  onSubmitForm: (user: SaveUserRequest) => void
}

const SettingsForm: FC<SettingsFormProps> = ({ onSubmitForm }) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(selectApp)
  const { inProgress } = useAppSelector(selectSettings)
  const [user, setUser] = useState({
    image: currentUser?.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg',
    username: currentUser?.username ?? '',
    bio: currentUser?.bio ?? '',
    email: currentUser?.email ?? '',
    password: '',
  })

  const { username, email, password, bio, image } = user

  const submitForm: FormEventHandler = (event) => {
    event.preventDefault()

    const user: SaveUserRequest = {
      username: username,
      email: email,
      password: password || undefined,
      bio: bio,
      image: image,
    }

    onSubmitForm(user)
  }

  const updateState =
    (field: string): ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
    (event) =>
      setUser({ ...user, [field]: event.target.value })

  useEffect(() => {
    return () => {
      dispatch(pageUnload())
    }
  }, [dispatch])

  return (
    <form onSubmit={submitForm}>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={image ?? ''}
            onChange={updateState('image')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={updateState('username')}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            value={bio ?? ''}
            onChange={updateState('bio')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            autoComplete="username"
            type="email"
            placeholder="Email"
            value={email}
            onChange={updateState('email')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            autoComplete="current-password"
            placeholder="New Password"
            value={password}
            onChange={updateState('password')}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
          disabled={inProgress}
        >
          Update Settings
        </button>
      </fieldset>
    </form>
  )
}

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
