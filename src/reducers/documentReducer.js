import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESSFUL
} from '../actions/documentActions'

export const initialState = {
  documents: [],
  documentsLoading: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS: {
      return {
        ...state,
        documents: [],
        documentsLoading: true
      }
    }

    case FETCH_DOCUMENTS_SUCCESSFUL: {
      return {
        ...state,
        documents: action.payload,
        documentsLoading: false
      }
    }

    default: {
      return state
    }
  }
}