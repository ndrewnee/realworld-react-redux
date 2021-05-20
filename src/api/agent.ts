import superagent from 'superagent'
import { User } from 'models/user'

const API_ROOT = process.env.REACT_APP_BACKEND_URL || 'https://conduit.productionready.io/api'
let token: string | null = null

const tokenPlugin: superagent.Plugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const responseBody = (res: superagent.Response) => res.body

interface SuperagentError extends Error {
  response: superagent.Response
}

const handleErrors = (err: SuperagentError) => err.response.body

const requests = {
  del: (url: string): any =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody).catch(handleErrors),
  get: (url: string): any =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody).catch(handleErrors),
  put: (url: string, body: any): any =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
  post: (url: string, body: any): any =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody)
      .catch(handleErrors),
}

const Auth = {
  current: () => requests.get('/user'),
  login: (email: string, password: string) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username: string, email: string, password: string) =>
    requests.post('/users', { user: { username, email, password } }),
  save: (user: User) => requests.put('/user', { user }),
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
