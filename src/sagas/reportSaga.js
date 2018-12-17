import { takeLatest, all, call, put } from 'redux-saga/effects'
import {
  FETCH_REPORTS, fetchReportsSuccessful
} from '../actions/reportActions'
import { error } from '../actions/apiActions'
import { reportApi } from '../utils/api'

export default function* reportSaga() {
  yield all([
    takeLatest(FETCH_REPORTS, fetchReportsSaga)
  ])
}

function* fetchReportsSaga() {
  try {
    const reports = yield call(reportApi.get)
    yield put(fetchReportsSuccessful(reports))
  } catch (e) {
    yield put(error(e))
  }
}