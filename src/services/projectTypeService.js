import axios from 'axios'

const apiUrl = '/v1/projecttypes/'

const getProjectTypes = async () => {
  const projectTypes = await axios.get(apiUrl)
  return projectTypes.data
}

export default {
  getProjectTypes
}
