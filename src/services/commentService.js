import apiUtils from '../utils/apiUtils'

const apiUrl = (id) => `/v1/projects/${id}/comments/`

const getComments = async (id) => await apiUtils.get(apiUrl(id))

const createComment = async (id, content) => await apiUtils.post(apiUrl(id), { content })

const editComment = async (projectId, commentId, content) => await apiUtils.patch(`${apiUrl(projectId)}${commentId}/`, { content })

const deleteComment = async (projectId, commentId) => await apiUtils.del(`${apiUrl(projectId)}${commentId}`)

export default {
  getComments,
  createComment,
  editComment,
  deleteComment
}
