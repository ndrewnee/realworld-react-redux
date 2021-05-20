import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { User } from 'models/user'

type AppState = {
  appName: string
  appLoaded: boolean
  redirectTo: string | null
  currentUser: User | null
}

const initialState: AppState = {
  appName: 'Conduit',
  appLoaded: false,
  redirectTo: null,
  currentUser: null,
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (state, { payload }) => {
      state.appLoaded = true
      state.currentUser = payload?.user ?? null
    })
  },
})

export const { redirect, logout } = appSlice.actions
export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
