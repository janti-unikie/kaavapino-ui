import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/users/'

const getUsers = async () => await apiUtils.get(apiUrl)

export default {
  getUsers
}
