
import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import {
  FETCH_SCHEMAS, fetchSchemasSuccessful,
  SET_LATEST_EDIT_FIELD, setLatestEditFieldSuccessful
} from '../actions/schemaActions'
import { latestUpdateSelector } from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import { error } from '../actions/apiActions'
import { schemaApi } from '../utils/api'

export default function* schemaSaga() {
  yield all([
    takeLatest(FETCH_SCHEMAS, fetchSchemas),
    takeLatest(SET_LATEST_EDIT_FIELD, latestEditedFieldSaga)
  ])
}

function* fetchSchemas({ payload: subtype }) {
  try {
    const [{ subtypes }] = yield call(schemaApi.get, { query: { subtypes: subtype } })
    yield put(fetchSchemasSuccessful(subtypes[0]))
    yield call(latestEditedFieldSaga)
  } catch (e) {
    yield put(error(e))
  }
}

function* latestEditedFieldSaga() {
  const schema = yield select(schemaSelector)
  const latestUpdate = yield select(latestUpdateSelector)
  const latestUpdateName = latestUpdate.field
  let fieldLabel = ''
  schema.phases.forEach(({ sections }) => sections.forEach(({ fields }) => fields.forEach(({ name, label }) => name === latestUpdateName ? fieldLabel = label : '')))
  yield put(setLatestEditFieldSuccessful({ name: fieldLabel, ...latestUpdate.latest }))
}
