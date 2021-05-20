import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import agent from 'api/agent'
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

export const auth = createAsyncThunk('login/auth', agent.Auth.login)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateField: (state, { payload }: PayloadAction<UpdateFieldPayload>) => {
      state.email = payload.email ?? state.email
      state.password = payload.password ?? state.password
    },
    unload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, { payload }: PayloadAction<LoginPayload>) => {
      state.errors = payload.errors
    })
  },
})

export const { updateField, unload } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer
