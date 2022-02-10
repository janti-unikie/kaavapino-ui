import {
  FETCH_COMMENTS,
  FETCH_COMMENTS_SUCCESSFUL,
  POLL_COMMENTS_SUCCESSFUL,
  CREATE_COMMENT_SUCCESSFUL,
  EDIT_COMMENT_SUCCESSFUL,
  DELETE_COMMENT_SUCCESSFUL,
  SET_TOTAL_COMMENTS,
  INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW,
  SET_AMOUNT_OF_COMMENTS_TO_SHOW,
  LOAD_COMMENTS_SUCCESSFUL,
  SET_UNREAD_COMMENTS_COUNT,
  FETCH_FIELD_COMMENTS_SUCCESSFUL,
  FETCH_FIELD_COMMENTS,
  FETCH_SINGLE_FIELD_COMMENTS_SUCCESSFUL,
  CLEAR_COMMENTS
} from '../actions/commentActions'

import { INITIALIZE_PROJECT } from '../actions/projectActions'

export const initialState = {
  comments: [],
  fieldComments: {},
  commentsLoading: false,
  amountOfCommentsToShow: 10,
  totalComments: 0,
  unreadCommentsCount: 0,
  pollingComments: false,
  fieldCommentsLoading: false
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        commentsLoading: true
      }

    case FETCH_COMMENTS_SUCCESSFUL:
      return {
        ...state,
        comments: payload,
        commentsLoading: false
      }

    case POLL_COMMENTS_SUCCESSFUL:
      return {
        ...state,
        amountOfCommentsToShow: 10
      }

    case LOAD_COMMENTS_SUCCESSFUL:
      return {
        ...state,
        comments: payload.concat(state.comments)
      }

    case CREATE_COMMENT_SUCCESSFUL:
      return {
        ...state,
        comments: state.comments.concat(payload)
      }

    case EDIT_COMMENT_SUCCESSFUL:
      return {
        ...state,
        comments: state.comments.map(c => (c.id === payload.id ? payload : c))
      }

    case DELETE_COMMENT_SUCCESSFUL:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== payload)
      }

    case SET_UNREAD_COMMENTS_COUNT:
      return {
        ...state,
        unreadCommentsCount: payload
      }

    case INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW:
      return {
        ...state,
        pollingComments: true
      }

    case SET_AMOUNT_OF_COMMENTS_TO_SHOW:
      return {
        ...state,
        amountOfCommentsToShow: payload,
        pollingComments: false
      }

    case SET_TOTAL_COMMENTS:
      return {
        ...state,
        totalComments: payload
      }

    case FETCH_FIELD_COMMENTS:
      return {
        ...state,
        fieldCommentsLoading: false
      }

    case FETCH_FIELD_COMMENTS_SUCCESSFUL:
      return {
        ...state,
        fieldComments: payload,
        fieldCommentsLoading: false
      }

    case FETCH_SINGLE_FIELD_COMMENTS_SUCCESSFUL:
      return {
        ...state,
        fieldComments: {
          ...state.fieldComments,
          [payload.fieldName]: payload.singleFieldComments
        }
      }

    case INITIALIZE_PROJECT:
      return {
        ...initialState
      }
    case CLEAR_COMMENTS: 
      return {
        ...initialState
      }  

    default:
      return state
  }
}
