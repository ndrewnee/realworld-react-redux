import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

type LoginState = {
  email: string
  password: string
  inProgress: boolean
  errors: {
    [k: string]: string
  } | null
}

type LoginPayload = {
  errors: {
    [k: string]: string
  } | null
}

type UpdateFieldPayload = {
  email?: string
  password?: string
}

const initialState: LoginState = {
  email: '',
  password: '',
  inProgress: false,
  errors: null,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.inProgress = false
      state.errors = action.payload.errors ?? null

      return state
    },
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      state.email = action.payload.email ?? state.email
      state.password = action.payload.password ?? state.password

      return state
    },
    unload: () => {
      return initialState
    },
  },
})

export const { login, updateField, unload } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer
