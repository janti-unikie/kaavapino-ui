import {
  FETCH_SCHEMAS_SUCCESSFUL,
  SET_ALL_EDIT_FIELDS_SUCCESSFUL,
  GET_PROJECT_CARD_FIELDS_SUCCESSFUL,
  GET_ATTRIBUTES_SUCCESSFUL
} from '../actions/schemaActions'
import { FETCH_PROJECTS } from '../actions/projectActions'

export const initialState = {
  schema: null,
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
        allEditFields: []
      }
    }

    case SET_ALL_EDIT_FIELDS_SUCCESSFUL: {
      return {
        ...state,
        allEditFields: action.payload
      }
    }

    case GET_PROJECT_CARD_FIELDS_SUCCESSFUL: {
      return {
        ...state,
        projectCardFields: action.payload
      }
    }

    case GET_ATTRIBUTES_SUCCESSFUL: {
      return {
        ...state,
        attributes: action.payload
      }
    }
    default: {
      return state
    }
  }
}
