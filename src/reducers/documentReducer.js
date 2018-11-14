import {
  FETCH_DOCUMENTS_SUCCESSFUL
} from '../actions/documentActions'

const initialState = {
  documents: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS_SUCCESSFUL: {
      return {
        ...state,
        documents: action.payload
      }
    }

    default: {
      return state
    }
  }
}