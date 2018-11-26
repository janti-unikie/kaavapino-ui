import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/schemas/'

const getSchemas = async (subtype) => await apiUtils.get(`${apiUrl}?subtypes=${subtype}`)

export default {
  getSchemas
}
