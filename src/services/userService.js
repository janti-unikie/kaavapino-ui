import axios from 'axios'

const apiUrl = '/v1/users/'

const getUsers = async () => {
  const users = await axios.get(apiUrl)
  return users.data
}

export default {
  getUsers
}
