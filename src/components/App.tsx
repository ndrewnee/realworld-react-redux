import React, { FC, Suspense, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/Header'
import Login from 'components/Login'
import { APP_LOAD, REDIRECT } from 'constants/actionTypes'
import { connect } from 'react-redux'
import agent from 'api/agent'

type AppProps = {
  appName?: string
  appLoaded?: boolean
  currentUser?: {
    username: string
    image: string
  }
  onLoad: (payload: any, token: any) => any
}

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
})

const App: FC<AppProps> = ({ appName, appLoaded, currentUser, onLoad }) => {
  useEffect(() => {
    const token = window.localStorage.getItem('jwt')
    if (token) {
      agent.setToken(token)
    }

    onLoad(token ? agent.Auth.current() : null, token)
  }, [])

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

export default connect(mapStateToProps, mapDispatchToProps)(App)
