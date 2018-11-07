import { all } from 'redux-saga/effects'
import authSaga from './authSaga'
import projectSaga from './projectSaga'
import userSaga from './userSaga'
import phaseSaga from './phaseSaga'
import schemaSaga from './schemaSaga'
import projectTypeSaga from './projectTypeSaga'

export default function* sagas() {
  yield all([
    authSaga(),
    projectSaga(),
    userSaga(),
    phaseSaga(),
    schemaSaga(),
    projectTypeSaga()
  ])
}
