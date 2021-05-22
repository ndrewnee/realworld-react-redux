import app from 'app/appSlice'
import { connectRouter } from 'connected-react-router'
import login from 'features/login/loginSlice'
import register from 'features/register/registerSlice'
import settings from 'features/settings/settingsSlice'
import editor from 'features/editor/editorSlice'
import profile from 'features/profile/profileSlice'
import articleList from 'features/articleList/articleListSlice'
import { History } from 'history'

const createRootReducer = (history: History) => ({
  app,
  login,
  register,
  settings,
  editor,
  profile,
  articleList,
  router: connectRouter(history),
})

export default createRootReducer
