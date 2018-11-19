import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { modalSelector, editFormSelector } from '../selectors/formSelector'
import { currentProjectSelector } from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import projectService from '../services/projectService'
import {
  FETCH_PROJECTS, fetchProjectsSuccessful,
  fetchProjectSuccessful, updateProject,
  CREATE_PROJECT, createProjectSuccessful,
  INITIALIZE_PROJECT, initializeProjectSuccessful,
  SAVE_PROJECT, saveProjectSuccessful,
  CHANGE_PROJECT_PHASE, changeProjectPhaseSuccessful,
  VALIDATE_PROJECT_FIELDS, validateProjectFieldsSuccessful,
  PROJECT_FILE_UPLOAD, PROJECT_FILE_REMOVE,
  projectFileUploadSuccessful, projectFileRemoveSuccessful
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded, change } from 'redux-form'
import { error } from '../actions/apiActions'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(INITIALIZE_PROJECT, initializeProject),
    takeLatest(CREATE_PROJECT, createProject),
    takeLatest(SAVE_PROJECT, saveProject),
    takeLatest(CHANGE_PROJECT_PHASE, changeProjectPhase),
    takeLatest(VALIDATE_PROJECT_FIELDS, validateProjectFields),
    takeLatest(PROJECT_FILE_UPLOAD, projectFileUpload),
    takeLatest(PROJECT_FILE_REMOVE, projectFileRemove)
  ])
}

function* fetchProjects() {
  try {
    const projects = yield call(projectService.getProjects)
    yield put(fetchProjectsSuccessful(projects))
  } catch (e) {
    yield put(error(e))
  }
}

function* initializeProject({ payload }) {
  try {
    const project = yield call(projectService.getProject, payload)
    yield put(fetchProjectSuccessful(project))
    yield put(initializeProjectSuccessful())
  } catch (e) {
    yield put(error(e))
  }
}

function* createProject() {
  yield put(startSubmit('modal'))
  const { values } = yield select(modalSelector)
  try {
    const createdProject = yield call(projectService.createProject, values)
    yield put(createProjectSuccessful(createdProject))
    yield put(setSubmitSucceeded('modal'))
  } catch (e) {
    if (e.response.status === 400) {
      yield put(stopSubmit('modal', e.response.data))
    } else {
      yield put(error(e))
    }
  }
}

function* saveProject() {
  const currentProject = yield select(currentProjectSelector)
  const { values } = yield select(editFormSelector)
  if (values) {
    const attribute_data = {
      ...values
    }
    try {
      const updatedProject = yield call(projectService.saveProject, currentProject.id, { attribute_data })
      yield put(updateProject(updatedProject))
    } catch (e) {
      yield put(error(e))
    }
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
  try {
    const updatedProject = yield call(projectService.changeProjectPhase, currentProject.id, payload)
    yield put(changeProjectPhaseSuccessful(updatedProject))
    window.scrollTo(0, 0)
  } catch (e) {
    yield put(error(e))
  }
}

function* projectFileUpload({ payload: { attribute, file } }) {
  const { id } = yield select(currentProjectSelector)
  try {
    const formData = new FormData()
    formData.append('attribute', attribute)
    formData.append('file', file)
    const newFile = yield call(projectService.projectFileUpload, id, formData)
    yield put(projectFileUploadSuccessful(newFile))
    yield put(change('editForm', newFile.attribute, newFile.file))
  } catch (e) {
    yield put(error(e))
  }
}

function* projectFileRemove({ payload }) {
  const { id } = yield select(currentProjectSelector)
  try {
    const attribute_data = {}
    attribute_data[payload] = null
    yield call(projectService.saveProject, id, { attribute_data })
    yield put(projectFileRemoveSuccessful(payload))
    yield put(change('editForm', payload, null))
  } catch (e) {
    yield put(error(e))
  }
}
