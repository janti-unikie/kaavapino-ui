import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { userIdSelector } from '../selectors/authSelector'
import { modalSelector } from '../selectors/formSelector'
import projectService from '../services/projectService'
import {
  FETCH_PROJECTS, fetchProjectsSuccessful,
  CREATE_PROJECT, createProjectSuccessful
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(CREATE_PROJECT, createProject)
  ])
}

function* fetchProjects() {
  const token = yield select(userIdSelector)
  const projects = yield call(projectService.getProjects, token)
  yield put(fetchProjectsSuccessful(projects))
}

function* createProject() {
  yield put(startSubmit('modal'))
  const token = yield select(userIdSelector)
  const { values } = yield select(modalSelector)
  try {
    const createdProject = yield call(projectService.createProject, token, values)
    yield put(createProjectSuccessful(createdProject))
    yield put(setSubmitSucceeded('modal'))
  } catch (e) {
    yield put(stopSubmit('modal', e.response.data))
  }
}
