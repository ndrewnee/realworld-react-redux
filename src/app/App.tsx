import { pageLoad, redirect, selectApp } from 'app/appSlice'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Header from 'components/Header'
import { push } from 'connected-react-router'
import Editor from 'features/editor/Editor'
import Home from 'features/home/Home'
import Login from 'features/login/Login'
import Profile from 'features/profile/Profile'
import ProfileFavorites from 'features/profile/ProfileFavorites'
import Register from 'features/register/Register'
import Settings from 'features/settings/Settings'
import React, { Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { appLoaded, currentUser, redirectTo } = useAppSelector(selectApp)

  useEffect(() => {
    dispatch(pageLoad())
  }, [dispatch])

  useEffect(() => {
    if (redirectTo) {
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
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={Settings} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
