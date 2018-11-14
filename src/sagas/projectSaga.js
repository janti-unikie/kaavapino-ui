import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { modalSelector, editFormSelector } from '../selectors/formSelector'
import { currentProjectSelector } from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import projectService from '../services/projectService'
import {
  FETCH_PROJECTS, fetchProjectsSuccessful,
  fetchProjectSuccessful,
  CREATE_PROJECT, createProjectSuccessful,
  INITIALIZE_PROJECT, initializeProjectSuccessful,
  SAVE_PROJECT, saveProjectSuccessful,
  CHANGE_PROJECT_PHASE, changeProjectPhaseSuccessful,
  VALIDATE_PROJECT_FIELDS, validateProjectFieldsSuccessful
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form'
import { executeService } from './apiSaga'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(INITIALIZE_PROJECT, initializeProject),
    takeLatest(CREATE_PROJECT, createProject),
    takeLatest(SAVE_PROJECT, saveProject),
    takeLatest(CHANGE_PROJECT_PHASE, changeProjectPhase),
    takeLatest(VALIDATE_PROJECT_FIELDS, validateProjectFields)
  ])
}

function* fetchProjects() {
  const projects = yield call(executeService, projectService.getProjects)
  yield put(fetchProjectsSuccessful(projects))
}

function* initializeProject({ payload }) {
  const project = yield call(executeService, projectService.getProject, payload)
  yield put(fetchProjectSuccessful(project))
  yield put(initializeProjectSuccessful())
}

function* createProject() {
  yield put(startSubmit('modal'))
  const { values } = yield select(modalSelector)
  try {
    const createdProject = yield call(executeService, projectService.createProject, values)
    yield put(createProjectSuccessful(createdProject))
    yield put(setSubmitSucceeded('modal'))
  } catch (e) {
    yield put(stopSubmit('modal', e.response.data))
  }
}

function* saveProject() {
  const currentProject = yield select(currentProjectSelector)
  const { values } = yield select(editFormSelector)
  if (values) {
    const attribute_data = {
      ...values
    }
    const updatedProject = yield call(executeService, projectService.saveProject, currentProject.id, { attribute_data })
    yield put(fetchProjectSuccessful(updatedProject))
  }
  yield put(saveProjectSuccessful())
}

function* validateProjectFields() {
  yield call(saveProject)
  const currentProject = yield select(currentProjectSelector)
  const schema = yield select(schemaSelector)
  const { sections } = schema.phases[currentProject.phase - 1]
  const attributeData = currentProject.attribute_data
  let missingFields = false
  sections.forEach(({ fields }) => {
    fields.forEach((field) => {
      if (field.type === 'matrix') {
        const { matrix } = field
        matrix.fields.forEach((f) => {
          if (f.required && !attributeData[f.name]) {
            missingFields = true
            return
          }
        })
      }
      if (field.required && !attributeData[field.name]) {
        missingFields = true
      }
    })
  })
  yield put(validateProjectFieldsSuccessful(missingFields))
}

function* changeProjectPhase({ payload }) {
  yield call(saveProject)
  const currentProject = yield select(currentProjectSelector)
  const updatedProject = yield call(executeService, projectService.changeProjectPhase, currentProject.id, payload)
  yield put(changeProjectPhaseSuccessful(updatedProject))
  window.scrollTo(0, 0)
}
