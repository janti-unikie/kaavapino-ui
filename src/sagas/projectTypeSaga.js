
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_PROJECT_TYPES, fetchProjectTypesSuccessful,
  FETCH_PROJECT_SUBTYPES, fetchProjectSubtypesSuccessful
} from '../actions/projectTypeActions'
import { error } from '../actions/apiActions'
import { projectTypeApi } from '../utils/api'
import { projectSubtypeApi } from '../utils/api'

export default function* projectTypeSaga() {
  yield all([
    takeLatest(FETCH_PROJECT_TYPES, fetchProjectTypes),
    takeLatest(FETCH_PROJECT_SUBTYPES, fetchProjectSubtypes)
  ])
}

function* fetchProjectTypes() {
  try {
    const projectTypes = yield call(projectTypeApi.get)
    yield put(fetchProjectTypesSuccessful(projectTypes))
  } catch (e) {
    yield put(error(e))
  }
}

function* fetchProjectSubtypes() {
  try {
    const projectSubtypes = yield call(projectSubtypeApi.get)
    yield put(fetchProjectSubtypesSuccessful(projectSubtypes))
  } catch (e) {
    yield put(error(e))
  }
}