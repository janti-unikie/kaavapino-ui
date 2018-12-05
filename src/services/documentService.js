import apiUtils from '../utils/apiUtils'

const apiUrl = (id) => `/v1/projects/${id}/documents/`

const fetchDocuments = (projectId) => apiUtils.get(apiUrl(projectId))

export default {
  fetchDocuments
}