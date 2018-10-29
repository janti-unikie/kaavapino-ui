
import { takeLatest, put, all, call } from 'redux-saga/effects'
import projectService from '../services/projectService'
import {
  FETCH_PROJECTS, fetchProjectsSuccessful
} from '../actions/projectActions'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects)
  ])
}

function* fetchProjects() {
  const projects = yield call(projectService.getProjects)
  yield put(fetchProjectsSuccessful(projects))
}
