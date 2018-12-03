import {
  TOKEN_LOADED
} from '../actions/apiActions'
import { USER_FOUND } from 'redux-oidc'

const initialState = {
  apiToken: null,
  loadingToken: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FOUND: {
      return {
        ...state,
        apiToken: null,
        loadingToken: true
      }
    }
    case TOKEN_LOADED: {
      return {
        ...state,
        apiToken: action.payload,
        loadingToken: false
      }
    }

    default: {
      return state
    }
  }
}