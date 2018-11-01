import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { modalSelector } from '../selectors/formSelector'
import projectService from '../services/projectService'
import {
  FETCH_PROJECTS, fetchProjectsSuccessful,
  fetchProjectSuccessful,
  CREATE_PROJECT, createProjectSuccessful,
  INITIALIZE_PROJECT, initializeProjectSuccessful
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(INITIALIZE_PROJECT, initializeProject),
    takeLatest(CREATE_PROJECT, createProject)
  ])
}

function* fetchProjects() {
  const projects = yield call(projectService.getProjects)
  yield put(fetchProjectsSuccessful(projects))
}

function* initializeProject({ payload }) {
  const project = yield call(projectService.getProject, payload)
  yield put(fetchProjectSuccessful(project))
  yield put(initializeProjectSuccessful())
}

function* createProject() {
  yield put(startSubmit('modal'))
  const { values } = yield select(modalSelector)
  try {
    const createdProject = yield call(projectService.createProject, values)
    yield put(createProjectSuccessful(createdProject))
    yield put(setSubmitSucceeded('modal'))
  } catch (e) {
    yield put(stopSubmit('modal', e.response.data))
  }
}
