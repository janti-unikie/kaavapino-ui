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

export default {
  initAxios,
  setToken,
  getToken
}