import { takeLatest, put, all, call } from 'redux-saga/effects'
import { USER_FOUND } from 'redux-oidc'
import { push } from 'connected-react-router'
import { ERROR, INIT_API_REQUEST, tokenLoaded, initApiRequestSuccessful, error } from '../actions/apiActions'
import apiUtils from '../utils/apiUtils'

export default function* apiSaga() {
  yield all([
    takeLatest(ERROR, handleErrorSaga),
    takeLatest(USER_FOUND, userFoundSaga),
    takeLatest(INIT_API_REQUEST, initApiRequestSaga)
  ])
}

function* handleErrorSaga({ payload }) {
  console.error(payload)
  if (payload.response) {
    const { status } = payload.response
    if (status === 401) {
      yield put(push('/logout'))
    } else {
      yield put(push(`/error/${status}`))
    }
  }
}

function* userFoundSaga({ payload }) {
  const audience = process.env.REACT_APP_OPENID_AUDIENCE
  apiUtils.setToken(payload.access_token)
  const data = yield apiUtils.get('https://api.hel.fi/sso/api-tokens/')
  const token = data[audience]
  apiUtils.setToken(token)
  yield put(tokenLoaded(token))
}

function* initApiRequestSaga() {
  try {
    yield call(apiUtils.get, '/v1/')
    yield put(initApiRequestSuccessful())
  } catch (e) {
    yield put(error(e))
  }
}
