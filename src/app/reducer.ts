import { connectRouter } from 'connected-react-router'
import app from 'features/app/appSlice'
import article from 'features/article/articleSlice'
import articleList from 'features/articleList/articleListSlice'
import editor from 'features/editor/editorSlice'
import home from 'features/home/homeSlice'
import login from 'features/login/loginSlice'
import profile from 'features/profile/profileSlice'
import register from 'features/register/registerSlice'
import settings from 'features/settings/settingsSlice'
import { History } from 'history'

const createReducer = (history: History) => ({
  app,
  login,
  register,
  settings,
  editor,
  profile,
  articleList,
  home,
  article,
  router: connectRouter(history),
})

export default createReducer
