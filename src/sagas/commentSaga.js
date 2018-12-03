import { all, takeLatest, put, call } from 'redux-saga/effects'
import {
  FETCH_COMMENTS, fetchCommentsSuccessful,
  CREATE_COMMENT, createCommentSuccessful,
  EDIT_COMMENT, editCommentSuccessful,
  DELETE_COMMENT, deleteCommentSuccessful
} from '../actions/commentActions'
import commentService from '../services/commentService'
import { error } from '../actions/apiActions'

export default function* commentSaga() {
  yield all([
    takeLatest(FETCH_COMMENTS, fetchCommentsSaga),
    takeLatest(CREATE_COMMENT, createCommentSaga),
    takeLatest(EDIT_COMMENT, editCommentSaga),
    takeLatest(DELETE_COMMENT, deleteCommentSaga)
  ])
}

function* fetchCommentsSaga({ payload }) {
  try {
    const comments = yield call(commentService.getComments, payload)
    yield put(fetchCommentsSuccessful(comments))
  } catch (e) {
    yield put(error(e))
  }
}

function* createCommentSaga({ payload: { id, content } }) {
  try {
    const newComment = yield call(commentService.createComment, id, content)
    yield put(createCommentSuccessful(newComment))
  } catch (e) {
    yield put(error(e))
  }
}

function* editCommentSaga({ payload: { projectId, commentId, content } }) {
  try {
    const updatedComment = yield call(commentService.editComment, projectId, commentId, content)
    yield put(editCommentSuccessful(updatedComment))
  } catch (e) {
    yield put(error(e))
  }
}

function* deleteCommentSaga({ payload: { projectId, commentId } }) {
  try {
    yield call(commentService.deleteComment, projectId, commentId)
    console.log('c', commentId)
    yield put(deleteCommentSuccessful(commentId))
  } catch (e) {
    yield put(error(e))
  }
}
