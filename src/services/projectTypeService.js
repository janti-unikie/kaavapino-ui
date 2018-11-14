import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/projecttypes/'

const getProjectTypes = async () => await apiUtils.get(apiUrl)

export default {
  getProjectTypes
}
