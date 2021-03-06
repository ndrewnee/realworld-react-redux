import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { RegisterRequest } from 'api/user'
import { RootState } from 'app/store'

interface RegisterState {
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: RegisterState = {
  inProgress: false,
}

export const signup = createAsyncThunk('register/signup', async (user: RegisterRequest) => {
  const response = await api.Auth.register(user)
  if (response.user?.token) {
    window.localStorage.setItem('jwt', response.user.token)
    api.setToken(response.user.token)
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
      .addCase(signup.rejected, (state, { error }) => {
        state.errors = { [error.name!]: error.message! }
        state.inProgress = false
      })
  },
})

export const { pageUnload } = registerSlice.actions
export const selectRegister = (state: RootState) => state.register

export default registerSlice.reducer
