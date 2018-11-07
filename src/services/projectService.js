import axios from 'axios'

const apiUrl = '/v1/projects/'

const getProjects = async () => {
  const { data } = await axios.get(apiUrl)
  return data
}

const getProject = async (id) => {
  const { data } = await axios.get(`${apiUrl}/${id}/`)
  return data
}

const createProject = async (project) => {
  const { data } = await axios.post(apiUrl, project)
  return data
}

const saveProject = async (id, updatedFields) => {
  const { data } = await axios.patch(`${apiUrl}/${id}/`, updatedFields)
  return data
}

const changeProjectPhase = async (id, phase) => {
  const { data } = await axios.patch(`${apiUrl}/${id}/`, { phase })
  return data
}

export default {
  getProjects,
  getProject,
  createProject,
  saveProject,
  changeProjectPhase
}
