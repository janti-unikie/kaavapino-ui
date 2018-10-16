import {
  FETCH_INPUTS_SUCCESSFUL,
  FETCH_OWN_PROJECTS_SUCCESSFUL,
  FETCH_ALL_PROJECTS_SUCCESSFUL,
  FETCH_PROJECT_SUCCESSFUL
} from '../actions/projectActions'

const initialState = {
  inputs: {},
  ownProjects: [],
  allProjects: [],
  currentProject: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INPUTS_SUCCESSFUL: {
      return {
        ...state,
        inputs: action.payload
      }
    }

    case FETCH_OWN_PROJECTS_SUCCESSFUL: {
      return {
        ...state,
        ownProjects: action.payload
      }
    }

    case FETCH_ALL_PROJECTS_SUCCESSFUL: {
      return {
        ...state,
        allProjects: action.payload
      }
    }

    case FETCH_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        currentProject: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default reducer