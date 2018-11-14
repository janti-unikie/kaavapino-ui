import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/schemas/'

const getSchemas = async () => await apiUtils.get(apiUrl)

export default {
  getSchemas
}
