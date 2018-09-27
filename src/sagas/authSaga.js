import { takeLatest, put, all } from 'redux-saga/effects'
import userManager from '../utils/userManager'
import { push } from 'connected-react-router'
import { LOGOUT, LOGIN_SUCCESSFUL, LOGOUT_SUCCESSFUL } from '../actions/authActions'

export function* authError() {
  yield all([
    takeLatest(LOGIN_SUCCESSFUL, loginSuccessful),
    takeLatest(LOGOUT, logout),
    takeLatest(LOGOUT_SUCCESSFUL, logoutSuccessful)
  ])
}

function* loginSuccessful() {
  yield put(push('/'))
}

function* logoutSuccessful() {
  yield put(push('/'))
}

function* logout() {
  yield userManager.clearStaleState()
  yield userManager.signoutRedirect()
}
