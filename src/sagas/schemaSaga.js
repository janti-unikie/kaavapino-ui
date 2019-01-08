
import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import {
  FETCH_SCHEMAS, fetchSchemasSuccessful,
  SET_LATEST_EDIT_FIELD, setLatestEditFieldSuccessful,
  SET_ALL_EDIT_FIELDS, setAllEditFieldsSuccessful
} from '../actions/schemaActions'
import { latestUpdateSelector, updatesSelector } from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import { error } from '../actions/apiActions'
import { schemaApi } from '../utils/api'

export default function* schemaSaga() {
  yield all([
    takeLatest(FETCH_SCHEMAS, fetchSchemas),
    takeLatest(SET_LATEST_EDIT_FIELD, latestEditedFieldSaga),
    takeLatest(SET_ALL_EDIT_FIELDS, allEditedFieldsSaga)
  ])
}

function* fetchSchemas({ payload: subtype }) {
  try {
    const [{ subtypes }] = yield call(schemaApi.get, { query: { subtypes: subtype } })
    yield put(fetchSchemasSuccessful(subtypes[0]))
    yield call(latestEditedFieldSaga)
    yield call(allEditedFieldsSaga)
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

function* allEditedFieldsSaga() {
  const schema = yield select(schemaSelector)
  const updates = yield select(updatesSelector)
  const result = []
  schema.phases.forEach(({ sections }) => sections.forEach(({ fields }) => fields.forEach(({ name, label }) => updates[name] ? result.push({ name: label, ...updates[name] }) : '')))
  yield put(setAllEditFieldsSuccessful(result.sort((u1, u2) => new Date(u2.timestamp).getTime() - new Date(u1.timestamp).getTime())))
}