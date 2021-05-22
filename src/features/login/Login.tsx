import { useAppDispatch, useAppSelector } from 'app/hooks'
import ListErrors from 'components/ListErrors'
import { auth, selectLogin, pageUnload } from 'features/login/loginSlice'
import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const { inProgress, errors } = useAppSelector(selectLogin)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const changeEmail: ChangeEventHandler<HTMLInputElement> = (event) => setEmail(event.target.value)

  const changePassword: ChangeEventHandler<HTMLInputElement> = (event) =>
    setPassword(event.target.value)

  const submitForm =
    (email: string, password: string): FormEventHandler =>
    (event) => {
      event.preventDefault()
      dispatch(auth({ email, password }))
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
            <h1 className="text-xs-center">Sign In</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>

            <ListErrors errors={errors} />

            <form onSubmit={submitForm(email, password)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    autoComplete="username"
                    type="email"
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
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
