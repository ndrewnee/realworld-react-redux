import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import api from 'api'
import { Article, ArticleEdit } from 'api/article'
import { RootState } from 'app/store'

interface EditorState {
  article: Pick<Article, 'slug' | 'title' | 'description' | 'body' | 'tagList'>
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

type UpdateFieldPayload = PayloadAction<{
  title?: string
  description?: string
  body?: string
  tagList?: string[]
}>

const initialState: EditorState = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
  },
  inProgress: false,
}

export const pageLoad = createAsyncThunk('editor/pageLoad', async (slug: string | null) =>
  slug ? api.Articles.get(slug) : null,
)

export const submitArticle = createAsyncThunk(
  'editor/submitArticle',
  async (article: ArticleEdit) =>
    article.slug ? api.Articles.update(article) : api.Articles.create(article),
)

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    pageUnload: () => initialState,
    updateField: (state, { payload }: UpdateFieldPayload) => {
      if (!state.article) {
        return
      }

      state.article.title = payload?.title ?? state.article.title
      state.article.description = payload?.description ?? state.article.description
      state.article.body = payload?.body ?? state.article.body
      state.article.tagList = payload?.tagList ?? state.article.tagList
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pageLoad.fulfilled, (state, { payload }) => {
        state.article = payload?.article ?? state.article
        state.errors = payload?.errors
        state.inProgress = false
      })
      .addCase(pageLoad.rejected, (state, { error }) => {
        state.errors = { [error.name!]: error.message! }
      })
      .addCase(submitArticle.pending, (state) => {
        state.inProgress = true
      })
      .addCase(submitArticle.fulfilled, (state, { payload }) => {
        state.errors = payload?.errors
        state.inProgress = false
      })
      .addCase(submitArticle.rejected, (state, { error }) => {
        state.errors = { [error.name!]: error.message! }
        state.inProgress = false
      })
  },
})

export const selectEditor = (state: RootState) => state.editor
export const { pageUnload, updateField } = editorSlice.actions

export default editorSlice.reducer
