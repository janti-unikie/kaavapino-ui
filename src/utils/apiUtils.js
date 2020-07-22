import axios from 'axios'

let token = null

const initAxios = () => {
  let baseURL = ''
  if (process.env.NODE_ENV === 'production') {
    baseURL = process.env.REACT_APP_BASE_URL
  }
  axios.interceptors.request.use(config => ({
    baseURL,
    responseType: 'json',
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        process.env.REACT_APP_API_TOKEN && getToken() === process.env.REACT_APP_API_TOKEN
          ? `Token ${getToken()}`
          : `Bearer ${getToken()}`,
      ...config.headers
    }
  }))
}

const setToken = newToken => (token = newToken)

const getToken = () => token

export const get = async (
  apiUrl,
  config = {},
  all = false,
  pages = false,
  force = true
) => {
  let res = await axios.get(apiUrl, { ...config })
  if (all) return res
  if (res.data.results && !pages) {
    let results = res.data.results
    if (force) {
      while (res.data.next) {
        res = await axios.get(res.data.next, { ...config })
        results = results.concat(res.data.results)
      }
      return results
    }
    return res.data.results
  }
  return res.data
}

export const post = async (apiUrl, body = {}, headers = {}) => {
  const { data } = await axios.post(apiUrl, body, { headers })
  return data
}

export const patch = async (apiUrl, body = {}, headers = {}) => {
  const { data } = await axios.patch(apiUrl, body, { headers })
  return data
}

export const put = async (apiUrl, body = {}, config = {}) => {
  const { data } = await axios.put(apiUrl, body, { ...config })
  return data
}

export const del = async (apiUrl, body = {}, config = {}) => {
  const { data } = await axios.delete(apiUrl, body, { ...config })
  return data
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
