
import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { userIdSelector } from '../selectors/authSelector'
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
  const token = yield select(userIdSelector)
  const phases = yield call(phaseService.getPhases, token)
  yield put(fetchPhasesSuccessful(phases))
}
