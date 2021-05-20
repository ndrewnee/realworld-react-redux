import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { LoginRequest } from 'models/user'

type LoginState = {
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: LoginState = {
  inProgress: false,
}

export const auth = createAsyncThunk('login/auth', async (user: LoginRequest) => {
  const response = await agent.Auth.login(user)
  if (response.user?.token) {
    window.localStorage.setItem('jwt', response.user.token)
    agent.setToken(response.user.token)
  }

  return response
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    unload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(auth.fulfilled, (state, { payload }) => {
      state.errors = payload.errors
      state.inProgress = false
    })
    builder.addCase(auth.rejected, (state) => {
      state.errors = { unknown: 'Oops, something went wrong!' }
      state.inProgress = false
    })
  },
})

export const { unload } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer
