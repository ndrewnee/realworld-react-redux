import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { LoginRequest } from 'api/user'
import { RootState } from 'app/store'

interface LoginState {
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: LoginState = {
  inProgress: false,
}

export const auth = createAsyncThunk('login/auth', async (user: LoginRequest) => {
  const response = await api.Auth.login(user)
  if (response.user?.token) {
    window.localStorage.setItem('jwt', response.user.token)
    api.setToken(response.user.token)
  }

  return response
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.inProgress = true
      })
      .addCase(auth.fulfilled, (state, { payload }) => {
        state.errors = payload.errors
        state.inProgress = false
      })
      .addCase(auth.rejected, (state, action) => {
        state.errors = { [action.error.name!]: action.error.message! }
        state.inProgress = false
      })
  },
})

export const { pageUnload } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer
