import {
  FETCH_PHASES_SUCCESSFUL
} from '../actions/phaseActions'

const initialState = {
  phases: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHASES_SUCCESSFUL: {
      return {
        ...state,
        phases: action.payload
      }
    }

    default: {
      return state
    }
  }
}
