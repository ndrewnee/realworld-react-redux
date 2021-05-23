import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { RootState } from 'app/store'

interface HomeState {
  tab: string | null
  tag: string | null
  tags?: string[]
}

const initialState: HomeState = {
  tab: 'all',
  tag: null,
}

export const pageLoad = createAsyncThunk('home/pageLoad', async (token: string | null) => {
  const tab = token ? 'feed' : 'all'
  const articlesPromise = token ? api.Articles.feed : api.Articles.all
  const response = await Promise.all([api.Tags.getAll(), articlesPromise()])

  return { tab, pager: articlesPromise, tags: response[0], articles: response[1] }
})

export const articlesByTag = createAsyncThunk('home/articlesByTag', async (tag: string) => {
  const articles = await api.Articles.byTag(tag)

  return {
    tag,
    pager: (page?: number) => api.Articles.byTag(tag, page),
    articles,
  }
})

export const articlesByTab = createAsyncThunk('home/articlesByTab', async (tab: string) => {
  const articlesPromise = tab === 'all' ? api.Articles.all : api.Articles.feed
  const articles = await articlesPromise()

  return {
    tab,
    pager: articlesPromise,
    articles,
  }
})

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(pageLoad.fulfilled, (state, { payload }) => {
      state.tab = payload.tab
      state.tags = payload.tags?.tags
    })
    builder.addCase(articlesByTag.fulfilled, (state, { payload }) => {
      state.tag = payload.tag
      state.tab = null
    })
    builder.addCase(articlesByTab.fulfilled, (state, { payload }) => {
      state.tab = payload.tab
      state.tag = null
    })
  },
})

export const selectHome = (state: RootState) => state.home

export const { pageUnload } = homeSlice.actions

export default homeSlice.reducer
