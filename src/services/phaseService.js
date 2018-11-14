import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/phases/'

const getPhases = async () => await apiUtils.get(apiUrl)

export default {
  getPhases
}
