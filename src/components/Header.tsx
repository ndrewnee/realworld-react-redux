import { User } from 'api/user'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  currentUser: User | null
}

const LoggedOut: React.NamedExoticComponent<Props> = React.memo(({ currentUser }) => {
  if (currentUser) {
    return null
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </ul>
  )
})

const LoggedIn: React.NamedExoticComponent<Props> = React.memo(({ currentUser }) => {
  if (!currentUser) {
    return null
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/editor" className="nav-link">
          <i className="ion-compose"></i>&nbsp;New Post
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>

      <li className="nav-item">
        <Link to={`/@${currentUser.username}`} className="nav-link">
          <img
            src={currentUser.image ?? 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            className="user-pic"
            alt={currentUser.username}
          />
          {currentUser.username}
        </Link>
      </li>
    </ul>
  )
})

const Header: React.FC<Props> = ({ currentUser }) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>
        <LoggedOut currentUser={currentUser} />
        <LoggedIn currentUser={currentUser} />
      </div>
    </nav>
  )
}

export default Header
