import {
  FETCH_PROJECTS_SUCCESSFUL,
  FETCH_PROJECTS,
  FETCH_PROJECT_SUCCESSFUL,
  CREATE_PROJECT_SUCCESSFUL,
  INITIALIZE_PROJECT,
  INITIALIZE_PROJECT_SUCCESSFUL,
  SAVE_PROJECT,
  SAVE_PROJECT_SUCCESSFUL
} from '../actions/projectActions'

const initialState = {
  projects: null,
  users: [],
  currentProject: null,
  currentProjectLoaded: false,
  saving: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS: {
      return {
        ...state,
        currentProject: null,
        currentProjectLoaded: false
      }
    }

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

    case INITIALIZE_PROJECT: {
      return {
        ...state,
        currentProject: null,
        project: [],
        currentProjectLoaded: false
      }
    }

    case INITIALIZE_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        currentProjectLoaded: true
      }
    }

    case FETCH_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        currentProject: action.payload
      }
    }

    case SAVE_PROJECT: {
      return {
        ...state,
        saving: true
      }
    }

    case SAVE_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        saving: false
      }
    }

    default: {
      return state
    }
  }
}
