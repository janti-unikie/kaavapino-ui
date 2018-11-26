import apiUtils from '../utils/apiUtils'

const typeUrl = '/v1/projecttypes/'
const subTypeUrl = '/v1/projectsubtypes/'

const getProjectTypes = async () => await apiUtils.get(typeUrl)

const getProjectSubtypes = async () => await apiUtils.get(subTypeUrl)

export default {
  getProjectTypes,
  getProjectSubtypes
}
