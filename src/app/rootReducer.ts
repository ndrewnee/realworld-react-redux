import app from 'app/appSlice'
import login from 'features/login/loginSlice'
import register from 'features/register/registerSlice'
import settings from 'features/settings/settingsSlice'

const rootReducer = {
  app,
  login,
  register,
  settings,
}

export default rootReducer
