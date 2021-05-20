import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'

type SettingsState = {
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: SettingsState = {
  inProgress: false,
}

export const saveUser = createAsyncThunk('settings/saveUser', agent.Auth.save)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveUser.pending, (state) => {
      state.inProgress = true
    })
    builder.addCase(saveUser.fulfilled, (state, { payload }) => {
      state.errors = payload.errors
      state.inProgress = false
    })
    builder.addCase(saveUser.rejected, (state) => {
      state.errors = { unknown: 'Oops, something went wrong!' }
      state.inProgress = false
    })
  },
})

export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer