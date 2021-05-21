import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { auth } from 'features/login/loginSlice'
import { signup } from 'features/register/registerSlice'
import { saveUser } from 'features/settings/settingsSlice'
import { User } from 'models/user'

interface AppState {
  appLoaded: boolean
  redirectTo: string | null
  currentUser: User | null
  token: string | null
}

const initialState: AppState = {
  appLoaded: false,
  redirectTo: null,
  currentUser: null,
  token: null,
}

export const load = createAsyncThunk('app/load', async () => {
  const token = window.localStorage.getItem('jwt')
  if (token) {
    agent.setToken(token)
    return agent.Auth.current()
  }
})

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    redirect: (state) => {
      state.redirectTo = null
    },
    logout: (state) => {
      state.redirectTo = '/'
      state.currentUser = null
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(load.fulfilled, (state, { payload }) => {
        state.appLoaded = true
        state.currentUser = payload?.user ?? null
        state.token = payload?.user?.token ?? null
      })
      .addCase(auth.fulfilled, (state, { payload }) => {
        state.redirectTo = payload.errors ? null : '/'
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.redirectTo = payload.errors ? null : '/'
      })
      .addCase(saveUser.fulfilled, (state, { payload }) => {
        state.redirectTo = payload.errors ? null : '/'
      })
  },
})

export const { redirect, logout } = appSlice.actions
export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
