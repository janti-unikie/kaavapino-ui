export const ERROR = 'Error'
export const TOKEN_LOADED = 'Token loaded'
export const INIT_API_REQUEST = 'Init api request'
export const INIT_API_REQUEST_SUCCESSFUL = 'Init api request successful'

export const error = (e) => ({ type: ERROR, payload: e })
export const tokenLoaded = (token) => ({ type: TOKEN_LOADED, payload: token })
export const initApiRequest = () => ({ type: INIT_API_REQUEST })
export const initApiRequestSuccessful = () => ({ type: INIT_API_REQUEST_SUCCESSFUL })