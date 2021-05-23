import { useAppDispatch, useAppSelector } from 'app/hooks'
import Banner from 'features/home/Banner'
import MainView from 'features/home/MainView'
import Tags from 'features/home/Tags'
import { pageLoad, pageUnload } from 'features/home/homeSlice'
import React, { useEffect } from 'react'
import { selectApp } from 'app/appSlice'

const Home: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(selectApp)

  useEffect(() => {
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
