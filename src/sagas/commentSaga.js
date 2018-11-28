import { all, takeLatest, put, call } from 'redux-saga/effects'
import {
  FETCH_COMMENTS, fetchCommentsSuccessful,
  CREATE_COMMENT, createCommentSuccessful
} from '../actions/commentActions'
import commentService from '../services/commentService'
import { error } from '../actions/apiActions'

export default function* commentSaga() {
  yield all([
    takeLatest(FETCH_COMMENTS, fetchCommentsSaga),
    takeLatest(CREATE_COMMENT, createCommentSaga)
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
    const newComment = commentService.createComment(id, content)
    yield put(createCommentSuccessful(newComment))
  } catch (e) {
    yield put(error(e))
  }
}
