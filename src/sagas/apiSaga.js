import { takeLatest, put, all } from 'redux-saga/effects'
import { USER_FOUND } from 'redux-oidc'
import { tokenLoaded } from '../actions/apiActions'
import { push } from 'connected-react-router'
import { ERROR } from '../actions/apiActions'
import apiUtils from '../utils/apiUtils'

export default function* apiSaga() {
  yield all([
    takeLatest(USER_FOUND, userFoundSaga),
    takeLatest(ERROR, handleError)
  ])
}

function* userFoundSaga({ payload }) {
  const audience = process.env.REACT_APP_OPENID_AUDIENCE
  apiUtils.setToken(payload.access_token)
  const data = yield apiUtils.get('https://api.hel.fi/sso/api-tokens/')
  const token = data[audience]
  apiUtils.setToken(token)
  yield put(tokenLoaded(token))
}

function* handleError({ payload }) {
  if (payload.response) {
    const { status } = payload.response
    if (status === 401) {
      yield put(push('/logout'))
    } else {
      yield put(push(`/error/${status}`))
    }
  }
}
