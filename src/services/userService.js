import axios from 'axios'

const apiUrl = '/v1/users/'

const getHeaders = (token) => ({
  'Authorization': `bearer ${ token }`
})

const getUsers = async (token) => {
  const users = await axios.get(apiUrl, getHeaders(token))
  return users.data
}

export default {
  getUsers
}
