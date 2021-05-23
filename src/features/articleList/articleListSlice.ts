import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { Article, ArticleListResponse } from 'api/article'
import { RootState } from 'app/store'
import { articlesByTab, articlesByTag, pageLoad as homePageLoad } from 'features/home/homeSlice'
import { favoritesPageLoad, pageLoad as profilePageLoad } from 'features/profile/profileSlice'

interface ArticleListState {
  articles?: Article[]
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
  }) => {
    const articles = await pager(page)
    return {
      page,
      articles,
    }
  },
)

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(homePageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload.articles.articles
      state.articlesCount = payload.articles.articlesCount
      state.pager = payload.pager
      state.currentPage = 0
    })
    builder.addCase(articlesByTag.fulfilled, (state, { payload }) => {
      state.articles = payload.articles.articles
      state.articlesCount = payload.articles.articlesCount
      state.pager = payload.pager
      state.currentPage = 0
    })
    builder.addCase(articlesByTab.fulfilled, (state, { payload }) => {
      state.articles = payload.articles.articles
      state.articlesCount = payload.articles.articlesCount
      state.pager = payload.pager
      state.currentPage = 0
    })
    builder.addCase(articlesByPage.fulfilled, (state, { payload }) => {
      state.articles = payload.articles.articles
      state.articlesCount = payload.articles.articlesCount
      state.currentPage = payload.page
    })
    builder.addCase(profilePageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload[1].articles
      state.articlesCount = payload[1].articlesCount
      state.currentPage = 0
    })
    builder.addCase(favoritesPageLoad.fulfilled, (state, { payload }) => {
      state.articles = payload[1].articles
      state.articlesCount = payload[1].articlesCount
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

export const { pageUnload } = articleListSlice.actions

export default articleListSlice.reducer
