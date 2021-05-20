import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { LoginRequest } from 'models/user'

type LoginState = {
  email: string
  password: string
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

type UpdateFieldPayload = {
  email?: string
  password?: string
}

const initialState: LoginState = {
  email: '',
  password: '',
  inProgress: false,
}

export const auth = createAsyncThunk('login/login', async (user: LoginRequest) => {
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
    updateField: (state, { payload }: PayloadAction<UpdateFieldPayload>) => {
      state.email = payload.email ?? state.email
      state.password = payload.password ?? state.password
    },
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

export const { updateField, unload } = loginSlice.actions
export const selectLogin = (state: RootState) => state.login

export default loginSlice.reducer
