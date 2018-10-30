import {
  FETCH_PROJECTS_SUCCESSFUL,
  FETCH_PROJECTS,
  CREATE_PROJECT_SUCCESSFUL,
  SET_CURRENT_PROJECT
} from '../actions/projectActions'

const initialState = {
  projects: [],
  users: [],
  currentProject: null,
  loading: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_PROJECTS_SUCCESSFUL: {
      return {
        ...state,
        projects: action.payload,
        loading: false
      }
    }

    case CREATE_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        projects: state.projects.concat(action.payload)
      }
    }

    case SET_CURRENT_PROJECT: {
      return {
        ...state,
        currentProject: state.projects.find((project) => String(project.id) === action.payload)
      }
    }

    default: {
      return state
    }
  }
}
