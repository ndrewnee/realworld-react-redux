import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { User } from 'api/user'
import { RootState } from 'app/store'
import { deleteArticle } from 'features/article/articleSlice'
import { submitArticle } from 'features/editor/editorSlice'
import { auth } from 'features/login/loginSlice'
import { signup } from 'features/register/registerSlice'
import { saveUser } from 'features/settings/settingsSlice'

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

export const pageLoad = createAsyncThunk('app/pageLoad', async () => {
  const token = window.localStorage.getItem('jwt')
  if (token) {
    api.setToken(token)
    return api.Auth.current()
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
      .addCase(pageLoad.fulfilled, (state, { payload }) => {
        state.appLoaded = true
        state.currentUser = payload?.user ?? null
        state.token = payload?.user?.token ?? null
      })
      .addCase(auth.fulfilled, (state, { payload }) => {
        state.currentUser = payload?.user ?? null
        state.token = payload?.user?.token ?? null
        state.redirectTo = payload.errors ? null : '/'
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.currentUser = payload?.user ?? null
        state.token = payload?.user?.token ?? null
        state.redirectTo = payload.errors ? null : '/'
      })
      .addCase(saveUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload.user ?? state.currentUser
        state.redirectTo = payload.errors ? null : '/'
      })
      .addCase(submitArticle.fulfilled, (state, { payload }) => {
        const redirectUrl = payload.article ? `/article/${payload.article.slug}` : null
        state.redirectTo = redirectUrl
      })
      .addCase(deleteArticle.fulfilled, (state, { payload }) => {
        state.redirectTo = '/'
      })
  },
})

export const { redirect, logout } = appSlice.actions
export const selectApp = (state: RootState) => state.app

export default appSlice.reducer
