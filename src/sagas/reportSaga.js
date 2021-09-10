import { takeLatest, all, call, put, select } from 'redux-saga/effects'
import {
  FETCH_REPORTS,
  fetchReportsSuccessful,
  DOWNLOAD_REPORT,
  DOWNLOAD_REPORT_REVIEW,
  downloadReportReviewSuccessful
} from '../actions/reportActions'
import { reportFormSelector } from '../selectors/formSelector'
import { error } from '../actions/apiActions'
import { reportApi } from '../utils/api'
import { delay} from 'redux-saga'

export default function* reportSaga() {
  yield all([
    takeLatest(FETCH_REPORTS, fetchReportsSaga),
    takeLatest(DOWNLOAD_REPORT, downloadReportSaga),
    takeLatest(DOWNLOAD_REPORT_REVIEW, downloadReportPreviewSaga)
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
function* downloadReportPreviewSaga({ payload }) {
  let res
  let currentTask
  while ( !res || res.status === 202 ) {
    try {

      currentTask = res && res.data? res.data.detail : null
      if ( currentTask) {
        res = yield call(
          reportApi.get,
          { path: { id: payload.selectedReport, task: currentTask } },
          ':id/?preview=true&task=:task',
          { responseType: 'text' },
          true
        )  
        
      } else {
        res = yield call(
          reportApi.get,
          { path: { id: payload.selectedReport } },
          ':id/?preview=true',
          { responseType: 'text' },
          true
        )
      
      }
      
      yield call( delay , 4000 )
      
    } catch (e) {
      yield put(error(e))
    }
  }
  yield put(downloadReportReviewSuccessful(res.data))
 
}

function* downloadReportSaga({ payload }) {
  try {
    const {
      values: { ...rest }
    } = yield select(reportFormSelector)
    const res = yield call(
      reportApi.get,
      { path: { id: payload.selectedReport }, query: { ...rest } },
      ':id/',
      { responseType: 'blob' },
      true
    )

    const fileData = res.data
    const fileName = res.headers['content-disposition'].split('filename=')[1]
    if (fileData) {
      const url = window.URL.createObjectURL(new Blob([fileData]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (e) {
    yield put(error(e))
  }
}
