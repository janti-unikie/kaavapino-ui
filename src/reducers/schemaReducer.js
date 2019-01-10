import {
  FETCH_SCHEMAS_SUCCESSFUL,
  SET_LATEST_EDIT_FIELD_SUCCESSFUL,
  SET_ALL_EDIT_FIELDS_SUCCESSFUL
} from '../actions/schemaActions'
import {
  FETCH_PROJECTS
} from '../actions/projectActions'

export const initialState = {
  schema: null,
  latestEditField: null,
  allEditFields: []
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
        latestEditField: null,
        allEditFields: []
      }
    }

    case SET_LATEST_EDIT_FIELD_SUCCESSFUL: {
      return {
        ...state,
        latestEditField: action.payload
      }
    }

    case SET_ALL_EDIT_FIELDS_SUCCESSFUL: {
      return {
        ...state,
        allEditFields: action.payload
      }
    }

    default: {
      return state
    }
  }
}
