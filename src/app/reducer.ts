import app from 'app/appSlice'
import { connectRouter } from 'connected-react-router'
import login from 'features/login/loginSlice'
import register from 'features/register/registerSlice'
import settings from 'features/settings/settingsSlice'
import editor from 'features/editor/editorSlice'
import profile from 'features/profile/profileSlice'
import articleList from 'features/articleList/articleListSlice'
import home from 'features/home/homeSlice'
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
  router: connectRouter(history),
})

export default createReducer
