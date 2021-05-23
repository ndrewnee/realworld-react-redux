import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { Profile } from 'api/profile'
import { RootState } from 'app/store'

interface ProfileState {
  profile?: Profile
}

const initialState: ProfileState = {}

export const pageLoad = createAsyncThunk('profile/pageLoad', async (username: string) =>
  Promise.all([api.Profile.get(username), api.Articles.byAuthor(username)]),
)

export const favoritesPageLoad = createAsyncThunk(
  'profile/favoritesPageLoad',
  async (username: string) =>
    Promise.all([api.Profile.get(username), api.Articles.favoritedBy(username)]),
)

export const followUser = createAsyncThunk('profile/followUser', api.Profile.follow)

export const unfollowUser = createAsyncThunk('profile/unfollowUser', api.Profile.unfollow)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pageLoad.fulfilled, (state, { payload }) => {
      state.profile = payload[0].profile
    })
    builder.addCase(favoritesPageLoad.fulfilled, (state, { payload }) => {
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

export default profileSlice.reducer
