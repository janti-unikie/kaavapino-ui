import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import {
  FETCH_SCHEMAS,
  fetchSchemasSuccessful,
  SET_ALL_EDIT_FIELDS,
  setAllEditFieldsSuccessful
} from '../actions/schemaActions'
import { updatesSelector } from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import { error } from '../actions/apiActions'
import { schemaApi } from '../utils/api'
import projectUtils from '../utils/projectUtils'

export default function* schemaSaga() {
  yield all([
    takeLatest(FETCH_SCHEMAS, fetchSchemas),
    takeLatest(SET_ALL_EDIT_FIELDS, allEditedFieldsSaga)
  ])
}

function* fetchSchemas({ payload: {
  project,
  subtype
   } }) {
  try {
    const [{ subtypes }] = yield call(schemaApi.get, { query: { project: project, subtypes: subtype } })
    yield put(fetchSchemasSuccessful(subtypes[0]))
    yield call(allEditedFieldsSaga)
  } catch (e) {
    yield put(error(e))
  }
}

function* allEditedFieldsSaga() {
  const schema = yield select(schemaSelector)
  const updates = yield select(updatesSelector)
  const result = []
  if (!schema || !schema.phases) {
    return null
  }

  schema.phases.forEach(({ sections }) =>
    sections.forEach(({ fields }) => {
      fields.forEach(({ name, label, autofill_readonly }, i) => {
        if (!autofill_readonly) {
          return updates[name]
            ? result.push({ name: label, ...updates[name], autofill: autofill_readonly, id: i })
            : ''
        }
      })
    })
  )
  const uniques = projectUtils.getUniqueUpdates(
    result.sort(
      (u1, u2) => new Date(u2.timestamp).getTime() - new Date(u1.timestamp).getTime()
    )
  )
  yield put(setAllEditFieldsSuccessful(uniques))
}
