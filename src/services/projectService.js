import axios from 'axios'
import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/projects/'

const getProjects = async () => await apiUtils.get(apiUrl)

const getProject = async (id) => await apiUtils.get(`${apiUrl}${id}/`)

const createProject = async (project) => await apiUtils.post(apiUrl, project)

const saveProject = async (id, updatedFields) => await apiUtils.patch(`${apiUrl}${id}/`, updatedFields)

const changeProjectPhase = async (id, phase) => await apiUtils.patch(`${apiUrl}${id}/`, { phase })

const projectFileUpload = async (id, fileFormData, callback, setCancelToken) => {
  const CancelToken = axios.CancelToken
  const src = CancelToken.source()
  setCancelToken(src)
  return (
    await apiUtils.put(
      `${apiUrl}${id}/files/`,
      fileFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: callback,
        cancelToken: src.token
      }
    )
  )
}

export default {
  getProjects,
  getProject,
  createProject,
  saveProject,
  changeProjectPhase,
  projectFileUpload
}
