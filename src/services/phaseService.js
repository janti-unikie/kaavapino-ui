import axios from 'axios'

const apiUrl = '/v1/phases/'

const getHeaders = (token) => ({
  'Authorization': `bearer ${ token }`
})

const getPhases = async (token) => {
  const phases = await axios.get(apiUrl, getHeaders(token))
  return phases.data
}

export default {
  getPhases
}
