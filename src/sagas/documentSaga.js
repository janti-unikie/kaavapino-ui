import axios from 'axios'
import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  FETCH_DOCUMENTS,
  fetchDocumentsSuccessful,
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_DOCUMENT_PREVIEW
} from '../actions/documentActions'
import { error } from '../actions/apiActions'
import { documentApi } from '../utils/api'
import { toastr } from 'react-redux-toastr'
import i18next from 'i18next'
import FileSaver from 'file-saver'

export default function* documentSaga() {
  yield all([
    takeLatest(FETCH_DOCUMENTS, fetchDocumentsSaga),
    takeLatest(DOWNLOAD_DOCUMENT, downloadDocumentSaga),
    takeLatest(DOWNLOAD_DOCUMENT_PREVIEW, downloadDocumentPreviewSaga)
  ])
}

function* fetchDocumentsSaga({ payload: projectId }) {
  try {
    const documents = yield call(documentApi.get, { path: { id: projectId } })
    yield put(fetchDocumentsSuccessful(documents))
  } catch (e) {
    yield put(error(e))
  }
}

function* downloadDocumentSaga({ payload: payload }) {
  toastr.info(
    i18next.t('document-loading.title'),
    i18next.t('document-loading.content', { name: payload.name }),
    { closeOnToastrClick: false }
  )

  try {
    const res = yield call(axios.get, payload.file, { responseType: 'blob' })

    const fileData = res.data
    const fileName = res.headers['content-disposition'].split('filename=')[1]
    if (fileData) {
      FileSaver.saveAs(fileData, fileName)

      toastr.success(
        i18next.t('document-loading.title'),
        i18next.t('document-loading.document-loaded', { name: payload.name })
      )
    }
  } catch (e) {
    toastr.error(
      i18next.t('document-loading.title'),
      i18next.t('document-loading.error', { name: payload.name })
    )
  } finally {
    toastr.removeByType('info')
  }
}

function* downloadDocumentPreviewSaga({ payload: payload }) {
  const modifiedUrl = payload.file + '?preview=true'
  toastr.info(
    i18next.t('document-loading.preview-title'),
    i18next.t('document-loading.content', { name: payload.name }),
    { closeOnToastrClick: false }
  )

  try {
    const res = yield call(axios.get, modifiedUrl, { responseType: 'blob' })

    const fileData = res.data
    const fileName = res.headers['content-disposition'].split('filename=')[1]
    if (fileData) {
      FileSaver.saveAs(fileData, fileName)

      toastr.success(
        i18next.t('document-loading.title'),
        i18next.t('document-loading.document-preview-loaded', { name: payload.name })
      )
    }
  } catch (e) {
    toastr.error(
      i18next.t('document-loading.preview-title'),
      i18next.t('document-loading.error', { name: payload.name })
    )
  } finally {
    toastr.removeByType('info')
  }
}
