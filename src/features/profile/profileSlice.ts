import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { Profile } from 'models/profile'

interface ProfileState {
  profile: Profile | null
}

const initialState: ProfileState = {
  profile: null,
}

export const pageLoad = createAsyncThunk('profile/pageLoad', async (username: string) =>
  Promise.all([agent.Profile.get(username), agent.Articles.byAuthor(username, 1)]),
)

export const followUser = createAsyncThunk('profile/followUser', agent.Profile.follow)
export const unfollowUser = createAsyncThunk('profile/unfollowUser', agent.Profile.unfollow)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(pageLoad.fulfilled, (state, { payload }) => {
      state.profile = payload[0].profile
    })
    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.profile = payload.profile
    })
    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      state.profile = payload.profile
    })
  },
})

export const selectProfile = (state: RootState) => state.profile
export const { pageUnload } = profileSlice.actions

export default profileSlice.reducer
