import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import {
  FETCH_COMMENTS, POLL_COMMENTS, fetchCommentsSuccessful,
  CREATE_COMMENT, createCommentSuccessful,
  EDIT_COMMENT, editCommentSuccessful,
  DELETE_COMMENT, deleteCommentSuccessful,
  INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW, setAmountOfCommentsToShow,
  setTotalComments, loadCommentsSuccessful, pollCommentsSuccessful
} from '../actions/commentActions'
import { error } from '../actions/apiActions'
import {
  totalCommentsSelector,
  amountOfCommentsToShowSelector,
  commentsSelector
} from '../selectors/commentSelector'
import { currentProjectIdSelector } from '../selectors/projectSelector'
import { commentApi } from '../utils/api'

export default function* commentSaga() {
  yield all([
    takeLatest([FETCH_COMMENTS, POLL_COMMENTS], fetchCommentsSaga),
    takeLatest(CREATE_COMMENT, createCommentSaga),
    takeLatest(EDIT_COMMENT, editCommentSaga),
    takeLatest(DELETE_COMMENT, deleteCommentSaga),
    takeLatest(INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW, increaseAmountOfCommentsToShowSaga)
  ])
}

function* fetchCommentsSaga({ payload: projectId }, page, load = false) {
  try {
    const currentComments = yield select(commentsSelector)
    const comments = yield call(commentApi.get, { path: { id: projectId }, query: { ordering: '-created_at', page: page ? page : 1 } }, '', null, null, true)
    if (!load) {
      // Check if current comments include the polled comments
      const currentIds = currentComments.map(c => c.id)
      const loadedIds = comments.results.map(c => c.id)
      let updated
      if (loadedIds.every(val => currentIds.includes(val))) {
        updated = currentComments
      } else {
        // Reversing is needed since the comments are rendered from top to bottom
        updated = comments.results.reverse()
        yield put(pollCommentsSuccessful())
      }
      yield put(fetchCommentsSuccessful(updated))
    } else {
      yield put(loadCommentsSuccessful(comments.results.reverse()))
    }

    yield put(setTotalComments(comments.count))
  } catch (e) {
    yield put(error(e))
  }
}

function* createCommentSaga({ payload: { id: projectId, content } }) {
  try {
    const newComment = yield call(commentApi.post, { content }, { path: { id: projectId } })
    yield put(createCommentSuccessful(newComment))
    yield call(fetchCommentsSaga, { payload: projectId })
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

function* increaseAmountOfCommentsToShowSaga() {
  try {
    const PAGE_SIZE = 100 // Defined in backend
    const amountOfCommentsToShow = yield select(amountOfCommentsToShowSelector)
    const totalComments = yield select(totalCommentsSelector)
    const currentProjectId = yield select(currentProjectIdSelector)
    if (totalComments > amountOfCommentsToShow) {
      if (Math.floor(amountOfCommentsToShow / (PAGE_SIZE + 1)) + 1 !== Math.floor((amountOfCommentsToShow + 10) / (PAGE_SIZE + 1)) + 1) {
        yield call(fetchCommentsSaga, { payload: currentProjectId }, Math.floor((amountOfCommentsToShow + 10) / (PAGE_SIZE + 1)) + 1, true)
      }
      yield put(setAmountOfCommentsToShow(amountOfCommentsToShow + 10))
    } else {
      yield put(setAmountOfCommentsToShow(amountOfCommentsToShow))
    }
  } catch (e) {
    yield put(error(e))
  }
}
