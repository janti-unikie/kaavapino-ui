export const FETCH_USERS = 'Get users'
export const FETCH_USERS_SUCCESSFUL = 'Get users successful'

export const fetchUsers = () => ({ type: FETCH_USERS })

export const fetchUsersSuccessful = (users) => ({ type: FETCH_USERS_SUCCESSFUL, payload: users })

