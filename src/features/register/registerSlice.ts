import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { RegisterRequest } from 'models/user'

type RegisterState = {
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: RegisterState = {
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
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.inProgress = true
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.errors = payload.errors
        state.inProgress = false
      })
      .addCase(signup.rejected, (state, action) => {
        state.errors = { [action.error.name!]: action.error.message! }
        state.inProgress = false
      })
  },
})

export const { pageUnload } = registerSlice.actions
export const selectRegister = (state: RootState) => state.register

export default registerSlice.reducer
