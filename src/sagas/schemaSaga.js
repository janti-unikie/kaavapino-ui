
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_SCHEMAS, fetchSchemasSuccessful
} from '../actions/schemaActions'
import schemaService from '../services/schemaService'
import { error } from '../actions/apiActions'

export default function* schemaSaga() {
  yield all([
    takeLatest(FETCH_SCHEMAS, fetchSchemas)
  ])
}

function* fetchSchemas({ payload: subtype }) {
  try {
    const [ { subtypes } ] = yield call(schemaService.getSchemas, subtype)
    yield put(fetchSchemasSuccessful(subtypes[0]))
  } catch (e) {
    yield put(error(e))
  }
}
