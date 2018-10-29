
import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { userIdSelector } from '../selectors/authSelector'
import {
  FETCH_USERS, fetchUsersSuccessful
} from '../actions/userActions'
import userService from '../services/userService'

export default function* userSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsers)
  ])
}

function* fetchUsers() {
  const token = yield select(userIdSelector)
  const users = yield call(userService.getUsers, token)
  yield put(fetchUsersSuccessful(users))
}
