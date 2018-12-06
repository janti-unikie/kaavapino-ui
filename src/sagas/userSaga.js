import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_USERS, fetchUsersSuccessful
} from '../actions/userActions'
import { error } from '../actions/apiActions'
import { Api } from '../utils/apiUtils'

const userApi = new Api('/v1/users/')

export default function* userSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsers)
  ])
}

function* fetchUsers() {
  try {
    const users = yield call(userApi.get)
    yield put(fetchUsersSuccessful(users))
  } catch (e) {
    yield put(error(e))
  }
}
