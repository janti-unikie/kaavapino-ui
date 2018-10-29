import {
  FETCH_USERS_SUCCESSFUL
} from '../actions/userActions'

const initialState = {
  users: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESSFUL: {
      return {
        ...state,
        users: action.payload
      }
    }

    default: {
      return state
    }
  }
}
