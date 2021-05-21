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
      .addCase(saveUser.rejected, (state, action) => {
        state.errors = { [action.error.name!]: action.error.message! }
        state.inProgress = false
      })
  },
})

export const selectSettings = (state: RootState) => state.settings
export const { pageUnload } = settingsSlice.actions

export default settingsSlice.reducer
