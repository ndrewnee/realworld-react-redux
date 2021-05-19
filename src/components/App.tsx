import React, { FC } from 'react'
import Header, { HeaderProps } from 'components/Header'

const App: FC<HeaderProps> = ({ appName, currentUser }) => {
  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
    </div>
  )
}

export default App
