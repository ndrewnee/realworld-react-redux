import React from 'react'
import Header, { HeaderProps } from './Header'

function App(props: HeaderProps) {
  return (
    <div>
      <Header appName={props.appName} currentUser={props.currentUser} />
    </div>
  )
}

export default App
