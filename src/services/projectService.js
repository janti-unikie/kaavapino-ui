import axios from 'axios'

const apiUrl = '/v1/projects/'

const getProjects = async () => {
  const projects = await axios.get(apiUrl)
  return projects.data
}

const getProject = async (id) => {
  const project = await axios.get(`${apiUrl}/${id}/`)
  return project.data
}

const createProject = async (project) => {
  const newProject = await axios.post(apiUrl, project)
  return newProject.data
}

export default {
  getProjects,
  getProject,
  createProject
}
