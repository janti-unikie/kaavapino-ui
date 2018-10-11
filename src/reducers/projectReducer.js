import {
  FETCH_INPUTS_SUCCESSFUL,
  FETCH_OWN_PROJECTS_SUCCESSFUL,
  FETCH_ALL_PROJECTS_SUCCESSFUL
} from '../actions/projectActions'

const initialState = {
  inputs: {},
  ownProjects: [],
  allProjects: []
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

    default: {
      return state
    }
  }
}

export default reducer