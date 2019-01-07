import {
  FETCH_PROJECTS_SUCCESSFUL,
  FETCH_OWN_PROJECTS_SUCCESSFUL,
  FETCH_PROJECTS,
  FETCH_PROJECT_SUCCESSFUL,
  UPDATE_PROJECT,
  CREATE_PROJECT_SUCCESSFUL,
  CREATE_OWN_PROJECT_SUCCESSFUL,
  INITIALIZE_PROJECT,
  INITIALIZE_PROJECT_SUCCESSFUL,
  SAVE_PROJECT,
  SAVE_PROJECT_SUCCESSFUL,
  VALIDATE_PROJECT_FIELDS,
  VALIDATE_PROJECT_FIELDS_SUCCESSFUL,
  CHANGE_PROJECT_PHASE,
  CHANGE_PROJECT_PHASE_SUCCESSFUL,
  CHANGE_PROJECT_PHASE_FAILURE,
  PROJECT_FILE_UPLOAD_SUCCESSFUL,
  PROJECT_FILE_REMOVE_SUCCESSFUL,
  PROJECT_SET_CHECKING
} from '../actions/projectActions'

export const initialState = {
  projects: [],
  ownProjects: [],
  users: [],
  currentProject: null,
  currentProjectLoaded: false,
  saving: false,
  changingPhase: false,
  validating: false,
  hasErrors: false,
  checking: false
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

    case FETCH_OWN_PROJECTS_SUCCESSFUL: {
      return {
        ...state,
        ownProjects: action.payload
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

    case CREATE_OWN_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        ownProjects: state.ownProjects.concat(action.payload)
      }
    }

    case INITIALIZE_PROJECT: {
      return {
        ...state,
        currentProject: null,
        projects: [],
        currentProjectLoaded: false
      }
    }

    case INITIALIZE_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        currentProjectLoaded: true,
        checking: false
      }
    }

    case UPDATE_PROJECT:
    case FETCH_PROJECT_SUCCESSFUL: {
      return {
        ...state,
        currentProject: action.payload,
        saving: false
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

    case VALIDATE_PROJECT_FIELDS: {
      return {
        ...state,
        validating: true
      }
    }

    case VALIDATE_PROJECT_FIELDS_SUCCESSFUL: {
      return {
        ...state,
        validating: false,
        hasErrors: action.payload
      }
    }

    case CHANGE_PROJECT_PHASE: {
      return {
        ...state,
        changingPhase: true
      }
    }

    case CHANGE_PROJECT_PHASE_SUCCESSFUL: {
      return {
        ...state,
        currentProject: action.payload,
        changingPhase: false
      }
    }

    case CHANGE_PROJECT_PHASE_FAILURE: {
      return {
        ...state,
        changingPhase: false
      }
    }

    case PROJECT_FILE_UPLOAD_SUCCESSFUL: {
      const updatedAttributeData = { ...state.currentProject.attribute_data }
      updatedAttributeData[action.payload.attribute] = action.payload.file
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          attribute_data: { ...updatedAttributeData }
        }
      }
    }

    case PROJECT_FILE_REMOVE_SUCCESSFUL: {
      const updatedAttributeData = { ...state.currentProject.attribute_data }
      delete updatedAttributeData[action.payload]
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          attribute_data: { ...updatedAttributeData }
        }
      }
    }

    case PROJECT_SET_CHECKING: {
      return {
        ...state,
        checking: action.payload
      }
    }

    default: {
      return state
    }
  }
}
