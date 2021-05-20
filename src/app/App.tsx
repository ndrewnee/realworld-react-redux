import React, { FC, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import agent from 'api/agent'
import Header from 'components/Header'
import Login from 'features/login/Login'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { load, redirect, selectApp } from 'app/appSlice'

const App: FC = () => {
  const { appName, appLoaded, currentUser, redirectTo } = useAppSelector(selectApp)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
      dispatch(load())
    }
  }, [dispatch])

  useEffect(() => {
    if (redirectTo != null) {
      dispatch(redirect())
    }
  }, [dispatch, redirectTo])

  if (!appLoaded) {
    return (
      <div>
        <Header appName={appName} currentUser={currentUser} />
      </div>
    )
  }

  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
