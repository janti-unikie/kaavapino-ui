
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_USERS, fetchUsersSuccessful
} from '../actions/userActions'
import userService from '../services/userService'
import { executeService } from './apiSaga'

export default function* userSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsers)
  ])
}

function* fetchUsers() {
  const users = yield call(executeService, userService.getUsers)
  yield put(fetchUsersSuccessful(users))
}
