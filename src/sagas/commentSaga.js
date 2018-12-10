import { all, takeLatest, put, call } from 'redux-saga/effects'
import {
  FETCH_COMMENTS, fetchCommentsSuccessful,
  CREATE_COMMENT, createCommentSuccessful,
  EDIT_COMMENT, editCommentSuccessful,
  DELETE_COMMENT, deleteCommentSuccessful
} from '../actions/commentActions'
import { error } from '../actions/apiActions'
import { commentApi } from '../utils/api'

export default function* commentSaga() {
  yield all([
    takeLatest(FETCH_COMMENTS, fetchCommentsSaga),
    takeLatest(CREATE_COMMENT, createCommentSaga),
    takeLatest(EDIT_COMMENT, editCommentSaga),
    takeLatest(DELETE_COMMENT, deleteCommentSaga)
  ])
}

function* fetchCommentsSaga({ payload: projectId }) {
  try {
    const comments = yield call(commentApi.get, { path: { id: projectId } })
    yield put(fetchCommentsSuccessful(comments))
  } catch (e) {
    yield put(error(e))
  }
}

function* createCommentSaga({ payload: { id: projectId, content } }) {
  try {
    const newComment = yield call(commentApi.post, { content }, { path: { id: projectId } })
    yield put(createCommentSuccessful(newComment))
  } catch (e) {
    yield put(error(e))
  }
}

function* editCommentSaga({ payload: { projectId, commentId, content } }) {
  try {
    const updatedComment = yield call(commentApi.patch, { content }, { path: { id: projectId, commentId } }, ':commentId/')
    yield put(editCommentSuccessful(updatedComment))
  } catch (e) {
    yield put(error(e))
  }
}

function* deleteCommentSaga({ payload: { projectId, commentId } }) {
  try {
    yield call(commentApi.delete, { path: { id: projectId, commentId } }, ':commentId/')
    yield put(deleteCommentSuccessful(commentId))
  } catch (e) {
    yield put(error(e))
  }
}
