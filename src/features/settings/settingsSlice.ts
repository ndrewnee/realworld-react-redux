import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { RootState } from 'app/store'

interface SettingsState {
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: SettingsState = {
  inProgress: false,
}

export const saveUser = createAsyncThunk('settings/saveUser', api.Auth.save)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.pending, (state) => {
        state.inProgress = true
      })
      .addCase(saveUser.fulfilled, (state, { payload }) => {
        state.errors = payload.errors
        state.inProgress = false
      })
      .addCase(saveUser.rejected, (state, { error }) => {
        state.errors = { [error.name!]: error.message! }
        state.inProgress = false
      })
  },
})

export const selectSettings = (state: RootState) => state.settings
export const { pageUnload } = settingsSlice.actions

export default settingsSlice.reducer
