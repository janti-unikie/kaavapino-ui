export const ERROR = 'Error'
export const TOKEN_LOADED = 'Token loaded'

export const tokenLoaded = (token) => ({ type: TOKEN_LOADED, payload: token })
export const error = (e) => ({ type: ERROR, payload: e })