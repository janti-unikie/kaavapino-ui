import { takeLatest, put, all } from 'redux-saga/effects'
import projectService from '../services/projectService'
import {
  FETCH_INPUTS, fetchInputsSuccessful,
  FETCH_OWN_PROJECTS, fetchOwnProjectsSuccessful,
  FETCH_ALL_PROJECTS, fetchAllProjectsSuccessful,
  FETCH_PROJECT, fetchProjectSuccessful
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

function* fetchProject(action) {
  const project = yield projectService.getProject(action.payload)
  yield put(fetchProjectSuccessful(project))
}

export function* projectSaga() {
  yield all([
    takeLatest(FETCH_INPUTS, fetchInputs),
    takeLatest(FETCH_OWN_PROJECTS, fetchOwnProjects),
    takeLatest(FETCH_ALL_PROJECTS, fetchAllProjects),
    takeLatest(FETCH_PROJECT, fetchProject)
  ])
}
