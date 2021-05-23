import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from 'api'
import { ArticleEdit } from 'api/article'
import { RootState } from 'app/store'

interface EditorState {
  slug?: string
  title: string
  description: string
  body: string
  tagList: string[]
  inProgress: boolean
  errors?: {
    [k: string]: string
  }
}

const initialState: EditorState = {
  title: '',
  description: '',
  body: '',
  tagList: [],
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
    updateField: (state, { payload }) => {
      state.title = payload?.title ?? state.title
      state.description = payload?.description ?? state.description
      state.body = payload?.body ?? state.body
      state.tagList = payload?.tagList ?? state.tagList
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(pageLoad.fulfilled, (state, { payload }) => {
        state.slug = payload?.article?.slug ?? ''
        state.title = payload?.article?.title ?? ''
        state.description = payload?.article?.description ?? ''
        state.body = payload?.article?.body ?? ''
        state.tagList = payload?.article?.tagList ?? []
        state.errors = payload?.errors
        state.inProgress = false
      })
      .addCase(submitArticle.pending, (state) => {
        state.inProgress = true
      })
      .addCase(submitArticle.fulfilled, (state, { payload }) => {
        state.errors = payload?.errors
        state.inProgress = false
      })
      .addCase(submitArticle.rejected, (state, action) => {
        state.errors = { [action.error.name!]: action.error.message! }
        state.inProgress = false
      })
  },
})

export const selectEditor = (state: RootState) => state.editor
export const { pageUnload, updateField } = editorSlice.actions

export default editorSlice.reducer
