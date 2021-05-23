import { useAppDispatch, useAppSelector } from 'app/hooks'
import ListErrors from 'components/ListErrors'
import { selectRegister, signup, pageUnload } from './registerSlice'
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const { inProgress, errors } = useAppSelector(selectRegister)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) =>
    setUsername(event.target.value)

  const changeEmail: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value)

  const changePassword: ChangeEventHandler<HTMLInputElement> = (event) =>
    setPassword(event.target.value)

  const submitForm =
    (username: string, email: string, password: string): FormEventHandler =>
    (event) => {
      event.preventDefault()
      dispatch(signup({ username, email, password }))
    }

  useEffect(() => {
    return () => {
      dispatch(pageUnload())
    }
  }, [dispatch])

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(username, email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={changeUsername}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    autoComplete="username"
                    placeholder="Email"
                    value={email}
                    onChange={changeEmail}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    onChange={changePassword}
                  />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={inProgress}
                >
                  Sign up
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
