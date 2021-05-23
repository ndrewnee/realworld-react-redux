import api from 'api'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectApp } from 'features/app/appSlice'
import React, { useEffect } from 'react'
import Banner from './Banner'
import { changeTab, pageLoad, pageUnload } from './homeSlice'
import MainView from './MainView'
import Tags from './Tags'

const Home: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(selectApp)

  useEffect(() => {
    const tab = token ? 'feed' : 'all'
    const pager = token ? api.Articles.feed : api.Articles.all
    dispatch(changeTab({ tab, pager }))
    dispatch(pageLoad(token))

    return () => {
      dispatch(pageUnload())
    }
  }, [dispatch, token])

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <MainView />

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
