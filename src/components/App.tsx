import React, { FC, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from 'components/Header'
import Login from 'components/Login'

export type AppProps = {
  appName?: string
  appLoaded?: boolean
  currentUser?: {
    username: string
    image: string
  }
}

const App: FC<AppProps> = ({ appName, appLoaded, currentUser }) => {
  // if (!appLoaded) {
  //   return (
  //     <div>
  //       <Header appName={appName} currentUser={currentUser} />
  //     </div>
  //   )
  // }

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
