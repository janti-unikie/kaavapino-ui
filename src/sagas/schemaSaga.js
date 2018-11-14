
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_SCHEMAS, fetchSchemasSuccessful
} from '../actions/schemaActions'
import schemaService from '../services/schemaService'
import { executeService } from './apiSaga'

export default function* schemaSaga() {
  yield all([
    takeLatest(FETCH_SCHEMAS, fetchSchemas)
  ])
}

function* fetchSchemas({ payload: type }) {
  const schemas = yield call(executeService, schemaService.getSchemas)
  const schema = schemas.find((schema) => schema.type === type)
  yield put(fetchSchemasSuccessful(schema))
}
