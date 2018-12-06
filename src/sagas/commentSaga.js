import { all, takeLatest, put, call } from 'redux-saga/effects'
import {
  FETCH_COMMENTS, fetchCommentsSuccessful,
  CREATE_COMMENT, createCommentSuccessful,
  EDIT_COMMENT, editCommentSuccessful,
  DELETE_COMMENT, deleteCommentSuccessful
} from '../actions/commentActions'
import { error } from '../actions/apiActions'
import { Api } from '../utils/apiUtils'

const commentApi = new Api('/v1/projects/')

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
    const comments = yield call(commentApi.get, `${projectId}/comments/`)
    yield put(fetchCommentsSuccessful(comments))
  } catch (e) {
    yield put(error(e))
  }
}

function* createCommentSaga({ payload: { id: projectId, content } }) {
  try {
    const newComment = yield call(commentApi.post, { content }, `${projectId}/comments/`)
    yield put(createCommentSuccessful(newComment))
  } catch (e) {
    yield put(error(e))
  }
}

function* editCommentSaga({ payload: { projectId, commentId, content } }) {
  try {
    const updatedComment = yield call(commentApi.patch, { content }, `${projectId}/comments/${commentId}/`)
    yield put(editCommentSuccessful(updatedComment))
  } catch (e) {
    yield put(error(e))
  }
}

function* deleteCommentSaga({ payload: { projectId, commentId } }) {
  try {
    yield call(commentApi.delete, `${projectId}/comments/${commentId}/`)
    yield put(deleteCommentSuccessful(commentId))
  } catch (e) {
    yield put(error(e))
  }
}
