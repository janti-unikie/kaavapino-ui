import apiUtils from '../utils/apiUtils'

const apiUrl = (id) => `/v1/projects/${id}/comments/`

const getComments = async (id) => await apiUtils.get(apiUrl(id))

const createComment = async (id, content) => await apiUtils.post(apiUrl(id), { content })

export default {
  getComments,
  createComment
}
