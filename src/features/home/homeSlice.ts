import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { ArticleListResponse } from 'api/article'
import { RootState } from 'app/store'

interface HomeState {
  tab?: string | null
  tag?: string | null
  tags?: string[]
}

const initialState: HomeState = {}

type ChangeTagPayload = PayloadAction<{
  tag: string
  pager: (page?: number) => Promise<ArticleListResponse>
}>

type ChangeTabPayload = PayloadAction<{
  tab: string
  pager: (page?: number) => Promise<ArticleListResponse>
}>

export const pageLoad = createAsyncThunk('home/pageLoad', async (token: string | null) =>
  Promise.all([api.Tags.getAll(), token ? api.Articles.feed() : api.Articles.all()]),
)

export const articlesByTag = createAsyncThunk('home/articlesByTag', async (tag: string) =>
  api.Articles.byTag(tag),
)

export const articlesByTab = createAsyncThunk('home/articlesByTab', async (tab: string) =>
  tab === 'all' ? api.Articles.all() : api.Articles.feed(),
)

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeTag: (state, { payload }: ChangeTagPayload) => {
      state.tag = payload.tag
      state.tab = null
    },
    changeTab: (state, { payload }: ChangeTabPayload) => {
      state.tab = payload.tab
      state.tag = null
    },
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(pageLoad.fulfilled, (state, { payload }) => {
      state.tags = payload?.[0].tags
    })
  },
})

export const selectHome = (state: RootState) => state.home

export const { pageUnload, changeTag, changeTab } = homeSlice.actions

export default homeSlice.reducer
