import axios from 'axios'

let token = null

const initAxios = () => {
  axios.interceptors.request.use((config) => ({
    ...config,
    responseType: 'json',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json',
      'Authorization': `bearer ${getToken()}`
    }
  }))
}

const setToken = (newToken) => token = newToken

const getToken = () => token

const get = async (apiUrl) => {
  const { data } = await axios.get(apiUrl)
  return data
}

const post = async (apiUrl, body = {}) => {
  const { data } = await axios.post(apiUrl, body)
  return data
}

const patch = async (apiUrl, body = {}) => {
  const { data } = await axios.patch(apiUrl, body)
  return data
}

export default {
  initAxios,
  setToken,
  getToken,
  get,
  post,
  patch
}