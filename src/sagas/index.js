import { all } from 'redux-saga/effects'
import { incrementSaga } from './exampleSaga'
import { authError } from './authSaga'
import { projectSaga } from './projectSaga'

const sagas = function* sagas() {
  yield all([
    incrementSaga(),
    authError(),
    projectSaga()
  ])
}

export default sagas