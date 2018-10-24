import { all } from 'redux-saga/effects'
import authSaga from './authSaga'

const sagas = function* sagas() {
  yield all([
    authSaga()
  ])
}

export default sagas