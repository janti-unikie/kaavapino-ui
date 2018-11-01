import {
  FETCH_SCHEMAS_SUCCESSFUL
} from '../actions/schemaActions'
import {
  FETCH_PROJECTS
} from '../actions/projectActions'

const initialState = {
  schema: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHEMAS_SUCCESSFUL: {
      return {
        ...state,
        schema: action.payload
      }
    }

    case FETCH_PROJECTS: {
      return {
        ...state,
        schema: null
      }
    }

    default: {
      return state
    }
  }
}
