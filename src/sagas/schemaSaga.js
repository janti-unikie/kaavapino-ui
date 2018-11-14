
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

function* fetchSchemas({ payload: type }) {
  try {
    const schemas = yield call(schemaService.getSchemas)
    const schema = schemas.find((schema) => schema.type === type)
    yield put(fetchSchemasSuccessful(schema))
  } catch (e) {
    yield put(error(e))
  }
}
