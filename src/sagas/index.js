import { all } from 'redux-saga/effects'
import { incrementSaga } from './exampleSaga'
import { authError } from './authSaga'

const sagas = function* sagas() {
  yield all([
    incrementSaga(),
    authError()
  ])
}

export default sagas