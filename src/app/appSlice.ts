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
  appName: '',
  appLoaded: false,
  redirectTo: null,
  currentUser: null,
}

export const load = createAsyncThunk('app/load', agent.Auth.current)

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    redirect: (state) => {
      state.redirectTo = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (state, { payload }) => {
      state.appLoaded = true
      state.currentUser = payload.user
    })
  },
})

export const { redirect } = appSlice.actions
export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
