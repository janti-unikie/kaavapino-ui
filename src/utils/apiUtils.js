import axios from 'axios'

let token = null

const initAxios = () => {
  axios.interceptors.request.use((config) => ({
    responseType: 'json',
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${getToken()}`,
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

export default {
  initAxios,
  setToken,
  getToken,
  get,
  post,
  patch,
  put
}