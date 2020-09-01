import { all, takeLatest, put, call, select } from 'redux-saga/effects'
import {
  FETCH_COMMENTS,
  POLL_COMMENTS,
  fetchCommentsSuccessful,
  CREATE_COMMENT,
  createCommentSuccessful,
  EDIT_COMMENT,
  editCommentSuccessful,
  DELETE_COMMENT,
  deleteCommentSuccessful,
  INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW,
  setAmountOfCommentsToShow,
  setTotalComments,
  loadCommentsSuccessful,
  pollCommentsSuccessful,
  FETCH_UNREAD_COMMENTS_COUNT,
  setUnreadCommentsCount,
  MARK_COMMENTS_AS_READ,
  markCommentsAsRead,
  createFieldCommentSuccessful,
  CREATE_FIELD_COMMENT,
  EDIT_FIELD_COMMENT,
  DELETE_FIELD_COMMENT,
  FETCH_FIELD_COMMENTS,
  POLL_FIELD_COMMENTS,
  fetchFieldCommentsSuccessful,
  editFieldCommentSuccessful,
  deleteFieldCommentSuccessful,
  FETCH_SINGLE_FIELD_COMMENTS,
  fetchSingleFieldCommentsSuccessful
} from '../actions/commentActions'
import moment from 'moment'
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
    takeLatest(FETCH_UNREAD_COMMENTS_COUNT, fetchUnreadCommentsCountSaga),
    takeLatest(MARK_COMMENTS_AS_READ, markCommentsAsReadSaga),
    takeLatest(CREATE_COMMENT, createCommentSaga),
    takeLatest(EDIT_COMMENT, editCommentSaga),
    takeLatest(DELETE_COMMENT, deleteCommentSaga),
    takeLatest(INCREASE_AMOUNT_OF_COMMENTS_TO_SHOW, increaseAmountOfCommentsToShowSaga),
    takeLatest([FETCH_FIELD_COMMENTS, POLL_FIELD_COMMENTS], fetchFieldCommentsSaga),
    takeLatest(FETCH_SINGLE_FIELD_COMMENTS, fetchSingleFieldCommentsSaga),
    takeLatest(CREATE_FIELD_COMMENT, createFieldCommentSaga),
    takeLatest(EDIT_FIELD_COMMENT, editFieldCommentSaga),
    takeLatest(DELETE_FIELD_COMMENT, deleteFieldCommentSaga)
  ])
}

function* fetchCommentsSaga({ payload: projectId }, page, load = false) {
  try {
    const currentComments = yield select(commentsSelector)
    const comments = yield call(
      commentApi.get,
      {
        path: { id: projectId },
        query: { ordering: '-created_at', page: page ? page : 1 }
      },
      '',
      null,
      null,
      true
    )

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

function* fetchUnreadCommentsCountSaga({ payload: projectId }) {
  try {
    const unreadComments = yield call(
      commentApi.get,
      {
        path: { id: projectId }
      },
      'unread/',
      null,
      null,
      true
    )
    yield put(setUnreadCommentsCount(unreadComments.count))
  } catch (e) {
    yield put(error(e))
  }
}

function* markCommentsAsReadSaga({ payload: projectId }) {
  const timestamp = moment().format('YYYY-MM-DDTHH:mm:ss')

  try {
    yield call(
      commentApi.post,
      { timestamp },
      {
        path: { id: projectId }
      },
      'mark_as_read/',
      null,
      null,
      true
    )
    yield put(setUnreadCommentsCount(0))
  } catch (e) {
    yield put(error(e))
  }
}

function* createCommentSaga({ payload: { id: projectId, content } }) {
  try {
    const newComment = yield call(
      commentApi.post,
      { content },
      { path: { id: projectId } }
    )
    yield put(createCommentSuccessful(newComment))
    yield put(markCommentsAsRead(projectId))
    yield call(fetchCommentsSaga, { payload: projectId })
  } catch (e) {
    yield put(error(e))
  }
}

function* editCommentSaga({ payload: { projectId, commentId, content } }) {
  try {
    const updatedComment = yield call(
      commentApi.patch,
      { content },
      { path: { id: projectId, commentId } },
      ':commentId/'
    )
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
      if (
        Math.floor(amountOfCommentsToShow / (PAGE_SIZE + 1)) + 1 !==
        Math.floor((amountOfCommentsToShow + 10) / (PAGE_SIZE + 1)) + 1
      ) {
        yield call(
          fetchCommentsSaga,
          { payload: currentProjectId },
          Math.floor((amountOfCommentsToShow + 10) / (PAGE_SIZE + 1)) + 1,
          true
        )
      }
      yield put(setAmountOfCommentsToShow(amountOfCommentsToShow + 10))
    } else {
      yield put(setAmountOfCommentsToShow(amountOfCommentsToShow))
    }
  } catch (e) {
    yield put(error(e))
  }
}

/* Field comments */

const sortFieldCommentsByField = results => {
  const fieldCommentsByField = {}
  for (let i = 0; i < results.length; i += 1) {
    const comment = results[i]
    if (!fieldCommentsByField[comment.field]) {
      fieldCommentsByField[[comment.field]] = [comment]
    } else {
      fieldCommentsByField[[comment.field]].push(comment)
    }
  }
  return fieldCommentsByField
}

function* fetchFieldCommentsSaga({ payload: projectId } /* , load = false */) {
  try {
    const fieldComments = yield call(
      commentApi.get,
      {
        path: { id: projectId },
        query: { ordering: '-created_at' }
      },
      'fields/',
      null,
      null,
      true
    )

    yield put(
      fetchFieldCommentsSuccessful(
        sortFieldCommentsByField(fieldComments.results.reverse())
      )
    )
  } catch (e) {
    yield put(error(e))
  }
}

function* fetchSingleFieldCommentsSaga({ payload: { projectId, fieldName } }) {
  try {
    const singleFieldComments = yield call(
      commentApi.get,
      {
        path: { id: projectId },
        query: { ordering: '-created_at' }
      },
      `fields/field/${fieldName}`,
      null,
      null,
      true
    )
    yield put(fetchSingleFieldCommentsSuccessful(fieldName, singleFieldComments.results))
  } catch (e) {
    yield put(error(e))
  }
}

function* createFieldCommentSaga({ payload: { projectId, fieldName, content } }) {
  try {
    const newFieldComment = yield call(
      commentApi.post,
      { content, field: fieldName },
      { path: { id: projectId } },
      'fields/'
    )
    yield put(createFieldCommentSuccessful(newFieldComment))
    yield call(fetchSingleFieldCommentsSaga, { payload: { projectId, fieldName } })
  } catch (e) {
    yield put(error(e))
  }
}

function* editFieldCommentSaga({
  payload: { projectId, commentId, content, fieldName }
}) {
  try {
    const updatedComment = yield call(
      commentApi.patch,
      { content },
      { path: { id: projectId, commentId } },
      'fields/:commentId/'
    )
    yield put(editFieldCommentSuccessful(updatedComment))
    yield call(fetchSingleFieldCommentsSaga, { payload: { projectId, fieldName } })
  } catch (e) {
    yield put(error(e))
  }
}

function* deleteFieldCommentSaga({ payload: { projectId, commentId, fieldName } }) {
  try {
    yield call(
      commentApi.delete,
      { path: { id: projectId, commentId } },
      'fields/:commentId/'
    )
    yield put(deleteFieldCommentSuccessful(commentId))
    yield call(fetchSingleFieldCommentsSaga, { payload: { projectId, fieldName } })
  } catch (e) {
    yield put(error(e))
  }
}
