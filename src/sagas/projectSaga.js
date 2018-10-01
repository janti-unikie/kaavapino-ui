import { takeLatest, put } from 'redux-saga/effects'
import projectService from '../services/projectService'
import { FETCH_INPUTS, fetchInputsSuccessful } from '../actions/projectActions'

function* fetchInputs(action) {
  const inputs = yield projectService.getInputs(action.payload)
  yield put(fetchInputsSuccessful(inputs))
}

export function* projectSaga() {
  yield takeLatest(FETCH_INPUTS, fetchInputs)
}
