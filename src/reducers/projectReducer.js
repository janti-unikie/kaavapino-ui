import { FETCH_INPUTS_SUCCESSFUL } from '../actions/projectActions'

const initialState = {
  inputs: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INPUTS_SUCCESSFUL: {
      return {
        ...state,
        inputs: action.payload
      }
    }

    default: {
      return state
    }
  }
}

export default reducer