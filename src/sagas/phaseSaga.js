import { takeLatest, put, all, call } from 'redux-saga/effects'
import { FETCH_PHASES, fetchPhasesSuccessful } from '../actions/phaseActions'
import { error } from '../actions/apiActions'
import { phaseApi } from '../utils/api'

export default function* phaseSaga() {
  yield all([takeLatest(FETCH_PHASES, fetchPhases)])
}

function* fetchPhases() {
  try {
    const phases = yield call(phaseApi.get)
    yield put(fetchPhasesSuccessful(phases))
  } catch (e) {
    yield put(error(e))
  }
}
