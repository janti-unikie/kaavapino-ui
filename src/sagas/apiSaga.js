import { takeLatest, put, all } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { ERROR } from '../actions/apiActions'

export default function* apiSaga() {
  yield all([
    takeLatest(ERROR, handleError)
  ])
}

function* handleError({ payload }) {
  if (payload.response) {
    const { status } = payload.response
    if (status === 401) {
      yield put(push('/logout'))
    } else {
      yield put(push(`/error/${status}`))
    }
  }
}
