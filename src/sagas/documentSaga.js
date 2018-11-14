import { takeLatest, put, call } from 'redux-saga/effects'
import {
  FETCH_DOCUMENTS, fetchDocumentsSuccessful
} from '../actions/documentActions'
import documentService from '../services/documentService'

export default function* documentSaga() {
  yield takeLatest(FETCH_DOCUMENTS, fetchDocuments)
}

function* fetchDocuments() {
  const documents = yield call(documentService.fetchDocuments)
  yield put(fetchDocumentsSuccessful(documents))
}
