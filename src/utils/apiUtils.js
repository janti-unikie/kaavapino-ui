import axios from 'axios'

let token = null

const initAxios = () => {
  let baseURL = ''
  if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_BASE_URL
  }
  axios.interceptors.request.use((config) => ({
    baseURL,
    responseType: 'json',
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
      ...config.headers
    }
  }))
}

const setToken = (newToken) => token = newToken

const getToken = () => token

const get = async (apiUrl) => {
  const { data } = await axios.get(apiUrl)
  return data
}

const post = async (apiUrl, body = {}, headers = {}) => {
  const { data } = await axios.post(apiUrl, body, { headers })
  return data
}

const patch = async (apiUrl, body = {}, headers = {}) => {
  const { data } = await axios.patch(apiUrl, body, { headers })
  return data
}

const put = async (apiUrl, body = {}, config = {}) => {
  const { data } = await axios.put(apiUrl, body, { ...config })
  return data
}

const del = async (apiUrl, body = {}, config = {}) => {
  const { data } = await axios.delete(apiUrl, body, { ...config })
  return data
}

export class Api {
  constructor(apiUrl) {
    this.apiUrl = apiUrl
  }

  get = async (opt = '') => await get(`${this.apiUrl}${opt}`)

  getById = async (id) => await get(`${this.apiUrl}${id}/`)

  post = async (body = {}, opt = '') => await post(`${this.apiUrl}${opt}`, body)

  patch = async (body = {}, opt = '') => await patch(`${this.apiUrl}${opt}`, body)

  delete = async (opt = '') => await del(`${this.apiUrl}${opt}`)

  put = async (body = {}, opt = '', config = {}) => await put(`${this.apiUrl}${opt}`, body, config)
}

export default {
  initAxios,
  setToken,
  getToken,
  get,
  post,
  patch,
  put,
  del
}