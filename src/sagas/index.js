import { all } from 'redux-saga/effects'
import authSaga from './authSaga'
import projectSaga from './projectSaga'
import userSaga from './userSaga'
import phaseSaga from './phaseSaga'

export default function* sagas() {
  yield all([
    authSaga(),
    projectSaga(),
    userSaga(),
    phaseSaga()
  ])
}
