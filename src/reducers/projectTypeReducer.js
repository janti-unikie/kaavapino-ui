import {
  FETCH_PROJECT_TYPES_SUCCESSFUL,
  FETCH_PROJECT_SUBTYPES_SUCCESSFUL
} from '../actions/projectTypeActions'

const initialState = {
  projectTypes: null,
  projectSubtypes: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_TYPES_SUCCESSFUL: {
      return {
        ...state,
        projectTypes: action.payload
      }
    }

    case FETCH_PROJECT_SUBTYPES_SUCCESSFUL: {
      return {
        ...state,
        projectSubtypes: action.payload
      }
    }

    default: {
      return state
    }
  }
}
