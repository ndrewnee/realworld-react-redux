import React, { ChangeEventHandler, FC, FormEventHandler, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ListErrors from 'components/ListErrors'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectRegister, signup, updateField, unload } from 'features/register/registerSlice'

const Register: FC = () => {
  const { email, username, password, inProgress, errors } = useAppSelector(selectRegister)
  const dispatch = useAppDispatch()

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch(updateField({ username: event.target.value }))

  const changeEmail: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch(updateField({ email: event.target.value }))

  const changePassword: ChangeEventHandler<HTMLInputElement> = (event) =>
    dispatch(updateField({ password: event.target.value }))

  const submitForm =
    (username: string, email: string, password: string): FormEventHandler =>
    (event) => {
      event.preventDefault()
      dispatch(signup({ username, email, password }))
    }

  useEffect(() => {
    return () => {
      dispatch(unload())
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
