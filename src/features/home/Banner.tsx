import { useAppSelector } from 'app/hooks'
import { selectApp } from 'features/app/appSlice'
import React from 'react'

const Banner: React.FC<{}> = () => {
  const { token } = useAppSelector(selectApp)

  if (token) {
    return null
  }

  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  )
}

export default React.memo(Banner)
