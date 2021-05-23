import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { Article } from 'api/article'
import { Comment } from 'api/comment'
import { RootState } from 'app/store'

interface ArticleState {
  comments: Comment[]
  article?: Article | null
  errors?: {
    [k: string]: string
  }
}

const initialState: ArticleState = {
  comments: [],
}

export const pageLoad = createAsyncThunk('article/pageLoad', async (slug: string) =>
  Promise.all([api.Articles.get(slug), api.Comments.forArticle(slug)]),
)

export const deleteArticle = createAsyncThunk('article/deleteArticle', api.Articles.del)

export const addComment = createAsyncThunk(
  'article/addComment',
  async ({ slug, body }: { slug: string; body: string }) => api.Comments.create(slug, body),
)

export const deleteComment = createAsyncThunk(
  'article/deleteComment',
  async ({ slug, commentId }: { slug: string; commentId: string }) => [
    commentId,
    await api.Comments.del(slug, commentId),
  ],
)

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    pageUnload: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(pageLoad.fulfilled, (state, { payload }) => {
        state.article = payload?.[0].article ?? null
        state.comments = payload?.[1].comments
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.errors = payload.errors
        state.comments = payload.comment ? state.comments.concat([payload.comment]) : []
      })
      .addCase(addComment.rejected, (state, { error }) => {
        state.errors = { [error.name!]: error.message! }
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.comments = state.comments?.filter((c) => c.id !== payload[0])
      })
  },
})

export const selectArticle = (state: RootState) => state.article

export const { pageUnload } = articleSlice.actions

export default articleSlice.reducer
