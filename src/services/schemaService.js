import axios from 'axios'

const apiUrl = '/v1/schemas/'

const getSchemas = async () => {
  const schemas = await axios.get(apiUrl)
  return schemas.data
}

export default {
  getSchemas
}
