import { takeLatest, put, all, call } from 'redux-saga/effects'
import { FETCH_FOOTER, fetchFooterSuccessful } from '../actions/footerActions'
import { error } from '../actions/apiActions'
import { footerApi } from '../utils/api'

export default function* footerSaga() {
  yield all([takeLatest(FETCH_FOOTER, fetchFooter)])
}

function* fetchFooter() {
  try {
    const footer = yield call(footerApi.get)
    yield put(fetchFooterSuccessful(footer))
  } catch (e) {
    yield put(error(e))
  }
}
