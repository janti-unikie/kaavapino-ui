import axios from 'axios'
import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  FETCH_DOCUMENTS, fetchDocumentsSuccessful,
  DOWNLOAD_DOCUMENT
} from '../actions/documentActions'
import { error } from '../actions/apiActions'
import { documentApi } from '../utils/api'

export default function* documentSaga() {
  yield all([
    takeLatest(FETCH_DOCUMENTS, fetchDocumentsSaga),
    takeLatest(DOWNLOAD_DOCUMENT, downloadDocumentSaga)
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

function* downloadDocumentSaga({ payload: documentUrl }) {
  try {
    const res = yield call(axios.get, documentUrl, { responseType: 'blob' })
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
