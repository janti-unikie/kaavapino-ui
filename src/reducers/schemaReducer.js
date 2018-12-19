import {
  FETCH_SCHEMAS_SUCCESSFUL,
  SET_LATEST_EDIT_FIELD_SUCCESSFUL
} from '../actions/schemaActions'
import {
  FETCH_PROJECTS
} from '../actions/projectActions'

const initialState = {
  schema: null,
  latestEditField: null
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
        schema: null,
        latestEditField: null
      }
    }

    case SET_LATEST_EDIT_FIELD_SUCCESSFUL: {
      return {
        ...state,
        latestEditField: action.payload
      }
    }

    default: {
      return state
    }
  }
}
