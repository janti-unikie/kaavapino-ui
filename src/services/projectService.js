import axios from 'axios'

const apiUrl = '/v1/projects'

const getProjects = async () => {
  const projects = await axios.get(apiUrl)
  return projects.data
}

export default {
  getProjects
}
