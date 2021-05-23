import api from 'api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectApp } from 'features/app/appSlice'
import ArticleList from 'features/articleList/ArticleList'
import React, { MouseEventHandler, NamedExoticComponent } from 'react'
import { articlesByTab, changeTab, selectHome } from './homeSlice'

const YourFeedTab: NamedExoticComponent<{}> = React.memo(() => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(selectApp)
  const { tab } = useAppSelector(selectHome)

  if (!token) {
    return null
  }

  const clickHandler: MouseEventHandler = (event) => {
    event.preventDefault()
    dispatch(changeTab({ tab: 'feed', pager: api.Articles.feed }))
    dispatch(articlesByTab('feed'))
  }

  return (
    <li className="nav-item">
      <button
        type="button"
        className={tab === 'feed' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Your Feed
      </button>
    </li>
  )
})

const GlobalFeedTab: NamedExoticComponent<{}> = React.memo(() => {
  const dispatch = useAppDispatch()
  const { tab } = useAppSelector(selectHome)

  const clickHandler: MouseEventHandler = (event) => {
    event.preventDefault()
    dispatch(changeTab({ tab: 'all', pager: api.Articles.all }))
    dispatch(articlesByTab('all'))
  }

  return (
    <li className="nav-item">
      <button
        type="button"
        className={tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={clickHandler}
      >
        Global Feed
      </button>
    </li>
  )
})

const TagFilterTab: NamedExoticComponent<{}> = React.memo(() => {
  const { tag } = useAppSelector(selectHome)

  if (!tag) {
    return null
  }

  return (
    <li className="nav-item">
      <button type="button" className="nav-link active">
        <i className="ion-pound" /> {tag}
      </button>
    </li>
  )
})

const MainView: React.FC<{}> = () => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <YourFeedTab />
          <GlobalFeedTab />
          <TagFilterTab />
        </ul>
      </div>

      <ArticleList />
    </div>
  )
}

export default React.memo(MainView)
