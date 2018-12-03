import {
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESSFUL,
  CREATE_COMMENT_SUCCESSFUL,
  EDIT_COMMENT_SUCCESSFUL,
  DELETE_COMMENT_SUCCESSFUL
} from '../actions/commentActions'

const initialState = {
  comments: [],
  commentsLoading: false
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COMMENTS: return ({
      ...state,
      commentsLoading: true
    })

    case FETCH_COMMENTS_SUCCESSFUL: return ({
      ...state,
      comments: payload,
      commentsLoading: false
    })

    case CREATE_COMMENT_SUCCESSFUL: return ({
      ...state,
      comments: state.comments.concat(payload)
    })

    case EDIT_COMMENT_SUCCESSFUL: return ({
      ...state,
      comments: state.comments.map((c) => c.id === payload.id ? payload : c)
    })

    case DELETE_COMMENT_SUCCESSFUL: return ({
      ...state,
      comments: state.comments.filter((c) => c.id !== payload)
    })

    default: return state
  }
}