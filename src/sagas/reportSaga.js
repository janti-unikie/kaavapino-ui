import { takeLatest, all, call, put, select } from 'redux-saga/effects'
import {
  FETCH_REPORTS,
  fetchReportsSuccessful,
  DOWNLOAD_REPORT,
  DOWNLOAD_REPORT_REVIEW,
  downloadReportReviewSuccessful,
  downloadReportSuccessful
} from '../actions/reportActions'
import { reportFormSelector } from '../selectors/formSelector'
import { error } from '../actions/apiActions'
import { reportApi } from '../utils/api'
import { delay } from 'redux-saga'
import { toastr } from 'react-redux-toastr'
import i18next from 'i18next'
import { isArray } from 'lodash'

const MAX_COUNT = 100
const INTERVAL_MILLISECONDS = 4000

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
  let counter = 0

  const form = yield select(reportFormSelector)

  let rest = form ? form.values : {}
  let filteredParams = {}

  const keys = rest ? Object.keys(rest) : []

  keys.forEach(key => {
    const value = rest[key]

    if (isArray(value)) {
      if (value.length > 0) {
        filteredParams[key] = value
      }
    } else {
      if (value) {
        filteredParams[key] = value
      }
    }
  })

  if (!rest) {
    filteredParams = {
      preview: true
    }
  }

  res = yield call(
    reportApi.get,
    { path: { id: payload.selectedReport }, query: { ...filteredParams } },
    ':id/',
    { responseType: 'text' },
    true
  )
  currentTask = res && res.data ? res.data.detail : null

  toastr.info(i18next.t('reports.preview-title'), i18next.t('reports.content'))
  if (!currentTask) {
    toastr.removeByType('info')
    toastr.error(i18next.t('reports.preview-title'), i18next.t('reports.error'))
    isError = true
    yield put(downloadReportSuccessful())
  } else {
    while ((!res || res.status === 202) && !isError && counter < MAX_COUNT) {
      try {
        res = yield call(
          reportApi.get,
          { path: { id: payload.selectedReport, task: currentTask } },
          ':id/?preview=true&task=:task',
          { responseType: 'text' },
          true
        )
        counter++

        yield call(delay, INTERVAL_MILLISECONDS)
      } catch (e) {
        toastr.error(i18next.t('reports.preview-title'), i18next.t('reports.error'))
      }
    }
  }

  if (counter === MAX_COUNT) {
    toastr.error(i18next.t('reports.preview-title'), i18next.t('reports.error'))
    yield put(downloadReportReviewSuccessful(null))
  }

  if (!isError && counter !== MAX_COUNT) {
    toastr.success(i18next.t('reports.title'), i18next.t('reports.report-preview-loaded'))
    yield put(downloadReportReviewSuccessful(res.data))
  }
}

function* downloadReportSaga({ payload }) {
  let res
  let currentTask
  let isError = false

  let counter = 0

  const form = yield select(reportFormSelector)

  let filteredParams = {}

  const rest = form ? form.values : {}

  const keys = rest ? Object.keys(rest) : []

  keys.forEach(key => {
    const value = rest[key]

    if (isArray(value)) {
      if (value.length > 0) {
        filteredParams[key] = value
      }
    } else {
      if (value) {
        filteredParams[key] = value
      }
    }
  })

  toastr.info(i18next.t('reports.title'), i18next.t('reports.content'))

  res = yield call(
    reportApi.get,
    { path: { id: payload.selectedReport }, query: { ...filteredParams } },
    ':id/',
    { responseType: 'text' },
    true
  )
  currentTask = res && res.data ? res.data.detail : null

  if (!currentTask) {
    toastr.removeByType('info')
    toastr.error(i18next.t('reports.title'), i18next.t('reports.error'))
    isError = true
    yield put(downloadReportSuccessful())
  } else {
    while ((!res || res.status === 202) && !isError && counter < MAX_COUNT) {
      try {
        res = yield call(
          reportApi.get,
          { path: { id: payload.selectedReport, task: currentTask } },
          ':id/?task=:task',
          { responseType: 'blob' },
          true
        )
        counter++

        yield call(delay, INTERVAL_MILLISECONDS)
      } catch (e) {
        toastr.error(i18next.t('reports.title'), i18next.t('reports.error'))
        isError = true
      }
    }
  }

  toastr.removeByType('info')

  if (counter === MAX_COUNT) {
    toastr.error(i18next.t('reports.preview-title'), i18next.t('reports.error'))
    yield put(downloadReportSuccessful())
  }

  if (!isError && counter !== MAX_COUNT) {
    const fileData = res.data

    const contentDisposition = res.headers['content-disposition']
    const fileName = contentDisposition && contentDisposition.split('filename=')[1]
    if (fileData) {
      const url = window.URL.createObjectURL(new Blob([fileData]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toastr.success(i18next.t('reports.title'), i18next.t('reports.report-loaded'))
      yield put(downloadReportSuccessful())
    } else {
      toastr.error(i18next.t('reports.preview-title'), i18next.t('reports.error'))
      yield put(downloadReportSuccessful())
    }
  }
}
