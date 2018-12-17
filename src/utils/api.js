import apiUtils from './apiUtils'

const { get, post, patch, put, del } = apiUtils

class Api {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  formatUrl = (pathVariables = {}, queryParameters = {}, opt = '') => (
    Object.keys(pathVariables).reduce((url, key) => (
      url.replace(`:${key}`, pathVariables[key])
    ), Object.keys(queryParameters).reduce((url, key, i) => (
      `${url}${i !== 0 ?
        `&${key}=${queryParameters[key]}` :
        `?${key}=${queryParameters[key]}`}`
    ), `${this.apiUrl}${opt}`)
    )
  )

  get = async ({ path = {}, query = {} } = {}, opt = '', config = {}) => (
    await get(this.formatUrl(path, query, opt), config)
  )

  post = async (body = {}, { path = {}, query = {} } = {}, opt = '', config = {}) => (
    await post(this.formatUrl(path, query, opt), body, config)
  )

  patch = async (body = {}, { path = {}, query = {} } = {}, opt = '', config = {}) => (
    await patch(this.formatUrl(path, query, opt), body, config)
  )

  delete = async ({ path = {}, query = {} } = {}, opt = '', config = {}) => (
    await del(this.formatUrl(path, query, opt), config)
  )

  put = async (body = {}, { path = {}, query = {} } = {}, opt = '', config = {}) => (
    await put(this.formatUrl(path, query, opt), body, config)
  )
}

// Different API endpoints
export const commentApi = new Api('/v1/projects/:id/comments/')
export const documentApi = new Api('/v1/projects/:id/documents/')
export const phaseApi = new Api('/v1/phases/')
export const projectApi = new Api('/v1/projects/')
export const projectTypeApi = new Api('/v1/projecttypes/')
export const projectSubtypeApi = new Api('/v1/projectsubtypes/')
export const schemaApi = new Api('/v1/schemas/')
export const userApi = new Api('/v1/users/')
export const reportApi = new Api('/v1/reports/')
