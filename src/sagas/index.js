import { all } from 'redux-saga/effects'
import authSaga from './authSaga'
import projectSaga from './projectSaga'

export default function* sagas() {
  yield all([
    authSaga(),
    projectSaga()
  ])
}
