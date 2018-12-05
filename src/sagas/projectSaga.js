import axios from 'axios'
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
  projectFileUploadSuccessful, projectFileRemoveSuccessful,
  saveProject as saveProjectAction
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded, change } from 'redux-form'
import { error } from '../actions/apiActions'
import projectUtils from '../utils/projectUtils'

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
  const { initial, values } = yield select(editFormSelector)
  if (values) {
    const attribute_data = {}
    Object.keys(values).forEach((key) => {
      if (initial.hasOwnProperty(key) && initial[key] === values[key]) {
        return
      }
      attribute_data[key] = values[key]
    })
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
  // Gather up required data
  const currentProject = yield select(currentProjectSelector)
  const schema = yield select(schemaSelector)
  const currentSchema = schema.phases.find((s) => s.id === currentProject.phase)
  const { sections } = currentSchema
  const attributeData = currentProject.attribute_data
  let missingFields = false
  // Go through every single field
  sections.forEach(({ fields }) => {
    fields.forEach((field) => {
      // Matrices can contain any kinds of fields, so
      // we must go through them seperately
      if (field.type === 'matrix') {
        const { matrix } = field
        matrix.fields.forEach(({ required, name }) => {
          if (projectUtils.isFieldMissing(name, required, attributeData)) {
            missingFields = true
          }
        })
        // Fieldsets can contain any fields (except matrices)
        // multiple times, so we need to go through them all
      } else if (field.type === 'fieldset') {
        const { fieldset_attributes } = field
        const fieldsets = attributeData[field.name]
        fieldsets.forEach((set) => {
          fieldset_attributes.forEach(({ required, name }) => {
            if (projectUtils.isFieldMissing(name, required, set)) {
              missingFields = true
            }
          })
        })
      } else if (projectUtils.isFieldMissing(field.name, field.required, attributeData)) {
        missingFields = true
      }
    })
  })
  yield put(validateProjectFieldsSuccessful(missingFields))
  yield put(saveProjectAction())
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

function* projectFileUpload({ payload: { attribute, file, callback, setCancelToken } }) {
  const { id } = yield select(currentProjectSelector)
  try {
    const formData = new FormData()
    formData.append('attribute', attribute)
    formData.append('file', file)
    const newFile = yield call(projectService.projectFileUpload, id, formData, callback, setCancelToken)
    yield put(projectFileUploadSuccessful(newFile))
    yield put(change('editForm', newFile.attribute, newFile.file))
    yield put(saveProjectAction())
  } catch (e) {
    if (!axios.isCancel(e)) {
      yield put(error(e))
    }
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

    yield put(saveProjectAction())
  } catch (e) {
    yield put(error(e))
  }
}
