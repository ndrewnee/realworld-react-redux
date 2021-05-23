import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { Article } from 'api/article'
import { RootState } from 'app/store'
import { favoritesPageLoad, pageLoad as profilePageLoad } from 'features/profile/profileSlice'

interface ArticleListState {
  articles?: Article[]
  articlesCount: number
}

const initialState: ArticleListState = {
  articlesCount: 0,
}

export const favoriteArticle = createAsyncThunk(
  'articleList/favoriteArticle',
  api.Articles.favorite,
)

export const unfavoriteArticle = createAsyncThunk(
  'articleList/unfavoriteArticle',
  api.Articles.unfavorite,
)

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
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

export const { pageUnload } = articleListSlice.actions

export default articleListSlice.reducer
