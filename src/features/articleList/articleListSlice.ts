import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from 'api/agent'
import { RootState } from 'app/store'
import { pageLoad as profilePageLoad, favoritesPageLoad } from 'features/profile/profileSlice'
import { Article } from 'models/article'

interface ArticleListState {
  articles?: Article[]
  articlesCount: number
}

const initialState: ArticleListState = {
  articlesCount: 0,
}

export const favoriteArticle = createAsyncThunk(
  'articleList/favoriteArticle',
  agent.Articles.favorite,
)

export const unfavoriteArticle = createAsyncThunk(
  'articleList/unfavoriteArticle',
  agent.Articles.unfavorite,
)

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profilePageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload[1].articles
      state.articlesCount = payload[1].articlesCount
    })
    builder.addCase(favoritesPageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload[1].articles
      state.articlesCount = payload[1].articlesCount
    })
    builder.addCase(favoriteArticle.fulfilled, (state, { payload }) => {
      state.articles = state.articles?.map((article) => {
        if (article.slug === payload.article?.slug) {
          article.favorited = payload.article.favorited
          article.favoritesCount = payload.article.favoritesCount
        }

        return article
      })
    })
    builder.addCase(unfavoriteArticle.fulfilled, (state, { payload }) => {
      state.articles = state.articles?.map((article) => {
        if (article.slug === payload.article?.slug) {
          article.favorited = payload.article.favorited
          article.favoritesCount = payload.article.favoritesCount
        }

        return article
      })
    })
  },
})

export const selectArticleList = (state: RootState) => state.articleList

export default articleListSlice.reducer
