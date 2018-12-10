import {
  TOKEN_LOADED,
  INIT_API_REQUEST_SUCCESSFUL
} from '../actions/apiActions'
import { USER_FOUND } from 'redux-oidc'

const initialState = {
  apiToken: null,
  loadingToken: false,
  apiInitialized: true
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_FOUND: {
      return {
        ...state,
        apiToken: null,
        loadingToken: true,
        apiInitialized: false
      }
    }

    case TOKEN_LOADED: {
      return {
        ...state,
        apiToken: action.payload,
        loadingToken: false
      }
    }

    case INIT_API_REQUEST_SUCCESSFUL: {
      return {
        ...state,
        apiInitialized: true
      }
    }

    default: {
      return state
    }
  }
}