import app from 'app/appSlice'
import login from 'features/login/loginSlice'
import register from 'features/register/registerSlice'

const rootReducer = {
  app,
  login,
  register,
}

export default rootReducer
