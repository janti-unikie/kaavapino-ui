import {
  FETCH_PROJECT_TYPES_SUCCESSFUL
} from '../actions/projectTypeActions'

const initialState = {
  projectTypes: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_TYPES_SUCCESSFUL: {
      return {
        ...state,
        projectTypes: action.payload
      }
    }

    default: {
      return state
    }
  }
}
