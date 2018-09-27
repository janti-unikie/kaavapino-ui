export const LOGIN_SUCCESSFUL = 'Login successful'
export const LOGIN_FAILURE = 'Login failure'
export const LOGOUT = 'Logout'
export const LOGOUT_SUCCESSFUL = 'Logout successful'

export const loginSuccessful = () => ({ type: LOGIN_SUCCESSFUL })

export const loginFailure = () => ({ type: LOGIN_FAILURE })

export const logout = () => ({ type: LOGOUT })

export const logoutSuccessful = () => ({ type: LOGOUT_SUCCESSFUL })
