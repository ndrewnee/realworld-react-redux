import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { Article, ArticleListResponse } from 'api/article'
import { RootState } from 'app/store'
import {
  articlesByTab,
  articlesByTag,
  changeTab,
  changeTag,
  pageLoad as homePageLoad,
} from 'features/home/homeSlice'
import { favoritesPageLoad, pageLoad as profilePageLoad } from 'features/profile/profileSlice'

interface ArticleListState {
  articles?: Article[] | null
  articlesCount: number
  currentPage: number
  pager: (page?: number) => Promise<ArticleListResponse>
}

const initialState: ArticleListState = {
  articlesCount: 0,
  currentPage: 0,
  pager: api.Articles.all,
}

export const favoriteArticle = createAsyncThunk(
  'articleList/favoriteArticle',
  api.Articles.favorite,
)

export const unfavoriteArticle = createAsyncThunk(
  'articleList/unfavoriteArticle',
  api.Articles.unfavorite,
)

export const articlesByPage = createAsyncThunk(
  'articleList/articlesByPage',
  async ({
    page,
    pager,
  }: {
    pager: (page?: number) => Promise<ArticleListResponse>
    page: number
  }) => pager(page),
)

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    changePage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload
    },
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(changeTag, (state, { payload }) => {
      state.articles = null
      state.articlesCount = 0
      state.pager = payload.pager
      state.currentPage = 0
    })
    builder.addCase(changeTab, (state, { payload }) => {
      state.articles = null
      state.articlesCount = 0
      state.pager = payload.pager
      state.currentPage = 0
    })
    builder.addCase(homePageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload?.[1].articles
      state.articlesCount = payload?.[1].articlesCount
    })
    builder.addCase(articlesByTag.fulfilled, (state, { payload }) => {
      state.articles = payload.articles
      state.articlesCount = payload.articlesCount
    })
    builder.addCase(articlesByTab.fulfilled, (state, { payload }) => {
      state.articles = payload.articles
      state.articlesCount = payload.articlesCount
    })
    builder.addCase(articlesByPage.fulfilled, (state, { payload }) => {
      state.articles = payload.articles
      state.articlesCount = payload.articlesCount
    })
    builder.addCase(profilePageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload?.[1].articles
      state.articlesCount = payload?.[1].articlesCount
      state.currentPage = 0
    })
    builder.addCase(favoritesPageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload?.[1].articles
      state.articlesCount = payload?.[1].articlesCount
      state.currentPage = 0
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

export const { pageUnload, changePage } = articleListSlice.actions

export default articleListSlice.reducer
