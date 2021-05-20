import React, { FC, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { push } from 'connected-react-router'
import Header from 'components/Header'
import Login from 'features/login/Login'
import Register from 'features/register/Register'
import Settings from 'features/settings/Settings'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { load, redirect, selectApp } from 'app/appSlice'

const App: FC = () => {
  const { appLoaded, currentUser, redirectTo } = useAppSelector(selectApp)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(load())
  }, [dispatch])

  useEffect(() => {
    if (redirectTo != null) {
      dispatch(push(redirectTo))
      dispatch(redirect())
    }
  }, [dispatch, redirectTo])

  if (!appLoaded) {
    return (
      <div>
        <Header currentUser={currentUser} />
      </div>
    )
  }

  return (
    <div>
      <Header currentUser={currentUser} />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
