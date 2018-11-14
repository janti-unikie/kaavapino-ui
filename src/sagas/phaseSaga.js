import { takeLatest, put, all, call } from 'redux-saga/effects'
import {
  FETCH_PHASES, fetchPhasesSuccessful
} from '../actions/phaseActions'
import phaseService from '../services/phaseService'
import { executeService } from './apiSaga'

export default function* phaseSaga() {
  yield all([
    takeLatest(FETCH_PHASES, fetchPhases)
  ])
}

function* fetchPhases() {
  const phases = yield call(executeService, phaseService.getPhases)
  yield put(fetchPhasesSuccessful(phases))
}
