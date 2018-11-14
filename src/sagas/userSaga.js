
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_USERS, fetchUsersSuccessful
} from '../actions/userActions'
import userService from '../services/userService'
import { error } from '../actions/apiActions'

export default function* userSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsers)
  ])
}

function* fetchUsers() {
  try {
    const users = yield call(userService.getUsers)
    yield put(fetchUsersSuccessful(users))
  } catch (e) {
    yield put(error(e))
  }
}
