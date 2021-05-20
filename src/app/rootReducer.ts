import app from 'app/appSlice'
import login from 'features/login/loginSlice'
import register from 'features/register/registerSlice'
import settings from 'features/settings/settingsSlice'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

const createRootReducer = (history: History) => ({
  app,
  login,
  register,
  settings,
  router: connectRouter(history),
})

export default createRootReducer
