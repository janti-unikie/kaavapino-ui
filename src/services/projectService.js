import axios from 'axios'

const apiUrl = '/v1/projects/'

const getHeaders = (token) => ({
  'Authorization': `bearer ${ token }`
})

const getProjects = async (token) => {
  const projects = await axios.get(apiUrl, getHeaders(token))
  return projects.data
}

const createProject = async (token, project) => {
  const newProject = await axios.post(apiUrl, project, getHeaders(token))
  return newProject.data
}

export default {
  getProjects,
  createProject
}
