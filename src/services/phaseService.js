import axios from 'axios'

const apiUrl = '/v1/phases/'

const getPhases = async () => {
  const phases = await axios.get(apiUrl)
  return phases.data
}

export default {
  getPhases
}
