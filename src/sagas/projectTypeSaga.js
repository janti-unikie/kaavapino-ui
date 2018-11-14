
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_PROJECT_TYPES, fetchProjectTypesSuccessful
} from '../actions/projectTypeActions'
import projectTypeService from '../services/projectTypeService'
import { executeService } from './apiSaga'

export default function* projectTypeSaga() {
  yield all([
    takeLatest(FETCH_PROJECT_TYPES, fetchProjectTypes)
  ])
}

function* fetchProjectTypes() {
  const projectTypes = yield call(executeService, projectTypeService.getProjectTypes)
  yield put(fetchProjectTypesSuccessful(projectTypes))
}
