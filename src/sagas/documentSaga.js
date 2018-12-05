import { takeLatest, put, call, all } from 'redux-saga/effects'
import {
  FETCH_DOCUMENTS, fetchDocumentsSuccessful,
  DOWNLOAD_DOCUMENT
} from '../actions/documentActions'
import documentService from '../services/documentService'
import { error } from '../actions/apiActions'

export default function* documentSaga() {
  yield all([
    takeLatest(FETCH_DOCUMENTS, fetchDocumentsSaga),
    takeLatest(DOWNLOAD_DOCUMENT, downloadDocumentSaga)
  ])
}

function* fetchDocumentsSaga({ payload: projectId }) {
  try {
    const documents = yield call(documentService.fetchDocuments, projectId)
    yield put(fetchDocumentsSuccessful(documents))
  } catch (e) {
    yield put(error(e))
  }
}

function* downloadDocumentSaga({ payload: documentUrl }) {
  try {
    const res = yield call(documentService.downloadDocument, documentUrl)
    console.log('res', res)
  } catch (e) {
    yield put(error(e))
  }
}
