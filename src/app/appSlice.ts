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
  currentUser: UserResponse | null
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
    load: (state, { payload }: PayloadAction<LoadPayload>) => {
      state.appLoaded = true
      state.token = payload.token
      state.currentUser = payload.currentUser ? payload.currentUser.user : null
    },
    redirect: (state) => {
      state.redirectTo = null
    },
  },
})

export const { load, redirect } = appSlice.actions
export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
