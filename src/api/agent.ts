import superagent from 'superagent'
import {
  LoginRequest,
  LoginResponse,
  GetUserResponse,
  RegisterRequest,
  RegisterResponse,
  SaveUserRequest,
  SaveUserResponse,
} from 'models/user'

const API_ROOT = process.env.REACT_APP_BACKEND_URL || 'https://conduit.productionready.io/api'
let token: string | null = null

const tokenPlugin: superagent.Plugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const makeRequest = async (req: superagent.Request) => {
  try {
    const response = await req
    return response.body
  } catch (err) {
    if (err.response?.body) {
      return err.response.body
    }

    throw err
  }
}

const requests = {
  del: (url: string) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin),
  get: (url: string) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin),
  put: (url: string, body: any) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin),
  post: (url: string, body: any) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin),
}

const Auth = {
  current: (): Promise<GetUserResponse> => makeRequest(requests.get('/user')),
  login: (user: LoginRequest): Promise<LoginResponse> =>
    makeRequest(requests.post('/users/login', { user })),
  register: (user: RegisterRequest): Promise<RegisterResponse> =>
    makeRequest(requests.post('/users', { user })),
  save: (user: SaveUserRequest): Promise<SaveUserResponse> =>
    makeRequest(requests.put('/user', { user })),
}

const Tags = {
  getAll: () => requests.get('/tags'),
}

const encode = encodeURIComponent
const limit = (count: number, page: number) => `limit=${count}&offset=${page ? page * count : 0}`
const omitSlug = (article: any) => ({ ...article, slug: undefined })

const Articles = {
  all: (page: number) => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author: string | number | boolean, page: number) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag: string | number | boolean, page: number) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: (slug: string) => requests.del(`/articles/${slug}`),
  favorite: (slug: string) => requests.post(`/articles/${slug}/favorite`, {}),
  favoritedBy: (author: string | number | boolean, page: number) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/articles/feed?limit=10&offset=0'),
  get: (slug: string) => requests.get(`/articles/${slug}`),
  unfavorite: (slug: string) => requests.del(`/articles/${slug}/favorite`),
  update: (article: { slug: string }) =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article: any) => requests.post('/articles', { article }),
}

const Comments = {
  create: (slug: string, comment: string) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug: string, commentId: string) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: (slug: string) => requests.get(`/articles/${slug}/comments`),
}

const Profile = {
  follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
  get: (username: string) => requests.get(`/profiles/${username}`),
  unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
}

const agent = {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken: (newToken: string) => {
    token = newToken
  },
}

export default agent
