
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_SCHEMAS, fetchSchemasSuccessful
} from '../actions/schemaActions'
import { error } from '../actions/apiActions'
import { schemaApi } from '../utils/api'

export default function* schemaSaga() {
  yield all([
    takeLatest(FETCH_SCHEMAS, fetchSchemas)
  ])
}

function* fetchSchemas({ payload: subtype }) {
  try {
    const [{ subtypes }] = yield call(schemaApi.get, { query: { subtypes: subtype } })
    yield put(fetchSchemasSuccessful(subtypes[0]))
  } catch (e) {
    yield put(error(e))
  }
}
