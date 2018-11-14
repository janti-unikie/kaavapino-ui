import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_PHASES, fetchPhasesSuccessful
} from '../actions/phaseActions'
import phaseService from '../services/phaseService'
import { error } from '../actions/apiActions'

export default function* phaseSaga() {
  yield all([
    takeLatest(FETCH_PHASES, fetchPhases)
  ])
}

function* fetchPhases() {
  try {
    const phases = yield call(phaseService.getPhases)
    yield put(fetchPhasesSuccessful(phases))
  } catch (e) {
    yield put(error(e))
  }
}
