import {
  FETCH_PROJECTS_SUCCESSFUL,
  CREATE_PROJECT_SUCCESSFUL
} from '../actions/projectActions'

const initialState = {
  projects: [],
  users: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESSFUL: {
      return {
        ...state,
        projects: action.payload
      }
    }

    case CREATE_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        projects: state.projects.concat(action.payload)
      }
    }

    default: {
      return state
    }
  }
}
