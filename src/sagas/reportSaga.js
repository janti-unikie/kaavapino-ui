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
import { delay } from 'redux-saga'
import { toastr } from 'react-redux-toastr'
import i18next from 'i18next'

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
  let isError = false


  const form = yield select(reportFormSelector)

  let rest = form ? form.values : {}

  if ( !rest ) {
    rest = {
      preview: true
    }
  }
  
  toastr.info(
    i18next.t('reports.preview-title'),
    i18next.t('reports.content')
  )
  while ((!res || res.status === 202) && !isError) {
    try {
      currentTask = res && res.data ? res.data.detail : null
     
      if (currentTask) {
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
          { path: { id: payload.selectedReport }, query: { ...rest } },
          ':id/',
          { responseType: 'text' },
          true
        )
      }

      yield call(delay, 4000)
    } catch (e) {
      toastr.error(
        i18next.t('reports.preview-title'),
        i18next.t('reports.error')
      )
    }
  }
  toastr.removeByType('info')

  if (!isError) {
    yield put(downloadReportReviewSuccessful(res.data))
  }
}

function* downloadReportSaga({ payload }) {
  let res
  let currentTask
  let isError = false

  const form = yield select(reportFormSelector)

  const rest = form ? form.values : null

  toastr.info(
    i18next.t('reports.title'),
    i18next.t('reports.content')
  )
  while ( (!res || res.status === 202) && !isError ) {
    try {
      currentTask = res && res.data ? res.data.detail : null

      if (currentTask) {
        res = yield call(
          reportApi.get,
          { path: { id: payload.selectedReport, task: currentTask } },
          ':id/?task=:task',
          { responseType: 'text' },
          true
        )
      } else {
        res = yield call(
          reportApi.get,
          { path: { id: payload.selectedReport }, query: { ...rest } },
          ':id/',
          { responseType: 'text' },
          true
        )
      }

      yield call(delay, 4000)
    } catch (e) {
      toastr.error(
        i18next.t('reports.title'),
        i18next.t('reports.error')
      )
      isError = true
    }
  }

  toastr.removeByType('info')

  if (!isError) {
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
  }
}
