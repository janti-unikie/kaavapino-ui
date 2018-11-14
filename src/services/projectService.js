import apiUtils from '../utils/apiUtils'

const apiUrl = '/v1/projects/'

const getProjects = async () => await apiUtils.get(apiUrl)

const getProject = async (id) => await apiUtils.get(`${apiUrl}/${id}/`)

const createProject = async (project) => await apiUtils.post(apiUrl, project)

const saveProject = async (id, updatedFields) =>  await apiUtils.patch(`${apiUrl}/${id}/`, updatedFields)

const changeProjectPhase = async (id, phase) =>  await apiUtils.patch(`${apiUrl}/${id}/`, { phase })

export default {
  getProjects,
  getProject,
  createProject,
  saveProject,
  changeProjectPhase
}
