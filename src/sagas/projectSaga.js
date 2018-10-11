import { takeLatest, put, all } from 'redux-saga/effects'
import projectService from '../services/projectService'
import {
  FETCH_INPUTS, fetchInputsSuccessful,
  FETCH_OWN_PROJECTS, fetchOwnProjectsSuccessful,
  FETCH_ALL_PROJECTS, fetchAllProjectsSuccessful
} from '../actions/projectActions'

function* fetchInputs(action) {
  const inputs = yield projectService.getInputs(action.payload)
  yield put(fetchInputsSuccessful(inputs))
}

function* fetchOwnProjects() {
  const ownProjects = yield projectService.getOwnProjects()
  yield put(fetchOwnProjectsSuccessful(ownProjects))
}

function* fetchAllProjects() {
  const allProjects = yield projectService.getAllProjects()
  yield put(fetchAllProjectsSuccessful(allProjects))
}

export function* projectSaga() {
  yield all([
    takeLatest(FETCH_INPUTS, fetchInputs),
    takeLatest(FETCH_OWN_PROJECTS, fetchOwnProjects),
    takeLatest(FETCH_ALL_PROJECTS, fetchAllProjects)
  ])
}
