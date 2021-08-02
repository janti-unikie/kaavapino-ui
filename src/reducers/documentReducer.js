import {
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_SUCCESSFUL,
  CLEAR_DOCUMENT_PREVIEW
} from '../actions/documentActions'

export const initialState = {
  documents: [],
  documentsLoading: false,
  documentPreview: null
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
    case CLEAR_DOCUMENT_PREVIEW: {
      return {
        ...state,
        documentPreview: null
      }
    }

    default: {
      return state
    }
  }
}
