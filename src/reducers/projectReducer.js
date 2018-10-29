import {
  FETCH_PROJECTS_SUCCESSFUL
} from '../actions/projectActions'

const initialState = {
  projects: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESSFUL: {
      return {
        ...state,
        projects: action.payload
      }
    }

    default: {
      return state
    }
  }
}
