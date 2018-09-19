import { takeLatest, put } from 'redux-saga/effects'
import exampleService from '../services/exampleService'
import { REQUEST_VALUE, setValue } from '../actions/exampleActions'

function* generateNumber() {
  const result = yield exampleService.mockRequest()
  yield put(setValue(result))
}

export function* incrementSaga() {
  yield takeLatest(REQUEST_VALUE, generateNumber)
}
