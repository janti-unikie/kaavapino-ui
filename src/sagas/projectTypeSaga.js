
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_PROJECT_TYPES, fetchProjectTypesSuccessful,
  FETCH_PROJECT_SUBTYPES, fetchProjectSubtypesSuccessful
} from '../actions/projectTypeActions'
import projectTypeService from '../services/projectTypeService'
import { error } from '../actions/apiActions'

export default function* projectTypeSaga() {
  yield all([
    takeLatest(FETCH_PROJECT_TYPES, fetchProjectTypes),
    takeLatest(FETCH_PROJECT_SUBTYPES, fetchProjectSubtypes)
  ])
}

function* fetchProjectTypes() {
  try {
    const projectTypes = yield call(projectTypeService.getProjectTypes)
    yield put(fetchProjectTypesSuccessful(projectTypes))
  } catch (e) {
    yield put(error(e))
  }
}

function* fetchProjectSubtypes() {
  try {
    const projectSubtypes = yield call(projectTypeService.getProjectSubtypes)
    yield put(fetchProjectSubtypesSuccessful(projectSubtypes))
  } catch (e) {
    yield put(error(e))
  }
}