
import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_PHASES, fetchPhasesSuccessful
} from '../actions/phaseActions'
import phaseService from '../services/phaseService'

export default function* userSaga() {
  yield all([
    takeLatest(FETCH_PHASES, fetchPhases)
  ])
}

function* fetchPhases() {
  const phases = yield call(phaseService.getPhases)
  yield put(fetchPhasesSuccessful(phases))
}
