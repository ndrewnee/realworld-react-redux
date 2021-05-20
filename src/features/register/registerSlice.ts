import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { RegisterRequest } from 'models/user'

type RegisterState = {
  email: string
  username: string
  password: string
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

type UpdateFieldPayload = {
  email?: string
  username?: string
  password?: string
}

const initialState: RegisterState = {
  email: '',
  username: '',
  password: '',
  inProgress: false,
}

export const signup = createAsyncThunk('register/signup', async (user: RegisterRequest) => {
  const response = await agent.Auth.register(user)
  if (response.user?.token) {
    window.localStorage.setItem('jwt', response.user.token)
    agent.setToken(response.user.token)
  }

  return response
})

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateField: (state, { payload }: PayloadAction<UpdateFieldPayload>) => {
      state.username = payload.username ?? state.username
      state.email = payload.email ?? state.email
      state.password = payload.password ?? state.password
    },
    unload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.errors = payload.errors
    })
  },
})

export const { updateField, unload } = registerSlice.actions
export const selectRegister = (state: RootState) => state.register

export default registerSlice.reducer
