import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { UserResponse, User } from 'models/user'

type AppState = {
  appName: string
  appLoaded: boolean
  redirectTo: string | null
  token: string | null
  currentUser: User | null
}

type LoadPayload = {
  token: string | null
  currentUser?: UserResponse
}

const initialState: AppState = {
  appName: '',
  appLoaded: false,
  redirectTo: null,
  token: null,
  currentUser: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<LoadPayload>) => {
      state.token = action.payload.token
      state.appLoaded = true
      state.currentUser = action.payload.currentUser ? action.payload.currentUser.user : null

      return state
    },
    redirect: (state) => {
      state.redirectTo = null

      return state
    },
  },
})

export const { load, redirect } = appSlice.actions
export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
