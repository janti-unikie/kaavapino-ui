import {
  FETCH_PHASES_SUCCESSFUL
} from '../actions/phaseActions'

const initialState = {
  phases: null
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
