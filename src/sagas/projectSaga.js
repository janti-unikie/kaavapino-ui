import axios from 'axios'
import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { modalSelector, editFormSelector } from '../selectors/formSelector'
import { currentProjectSelector, currentProjectIdSelector } from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import { userIdSelector } from '../selectors/authSelector'
import {
  FETCH_PROJECTS, fetchProjectsSuccessful,
  fetchOwnProjectsSuccessful,
  fetchProjectSuccessful, updateProject,
  CREATE_PROJECT, createProjectSuccessful, createOwnProjectSuccessful,
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
import { projectApi } from '../utils/api'

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
    const userId = yield select(userIdSelector)
    const ownProjects = yield call(projectApi.get, { query: { includes_users: userId } })
    const allProjects = yield call(projectApi.get)
    yield put(fetchOwnProjectsSuccessful(ownProjects))
    yield put(fetchProjectsSuccessful(allProjects))
  } catch (e) {
    yield put(error(e))
  }
}

function* initializeProject({ payload: projectId }) {
  try {
    const project = yield call(projectApi.get, { path: { projectId } }, ':projectId/')
    yield put(fetchProjectSuccessful(project))
    yield put(initializeProjectSuccessful())
  } catch (e) {
    yield put(error(e))
  }
}

function* createProject() {
  yield put(startSubmit('modal'))
  const { values } = yield select(modalSelector)
  const userId = yield select(userIdSelector)
  try {
    const createdProject = yield call(projectApi.post, values)
    if (createdProject.user === userId) {
      yield put(createOwnProjectSuccessful(createdProject))
    } else {
      yield put(createProjectSuccessful(createdProject))
    }
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
  const currentProjectId = yield select(currentProjectIdSelector)
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
      const updatedProject = yield call(projectApi.patch, { attribute_data }, { path: { id: currentProjectId } }, ':id/')
      yield put(updateProject(updatedProject))
    } catch (e) {
      yield put(error(e))
    }
  }
  yield put(saveProjectSuccessful())
}

function* validateProjectFields() {
  try {
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
          if (fieldsets) {
            fieldsets.forEach((set) => {
              fieldset_attributes.forEach(({ required, name }) => {
                if (projectUtils.isFieldMissing(name, required, set)) {
                  missingFields = true
                }
              })
            })
          }
        } else if (projectUtils.isFieldMissing(field.name, field.required, attributeData)) {
          missingFields = true
        }
      })
    })
    yield put(validateProjectFieldsSuccessful(missingFields))
    yield put(saveProjectAction())
  } catch (e) {
    yield put(error(e))
  }
}

function* changeProjectPhase({ payload: phase }) {
  try {
    yield call(saveProject)
    const currentProjectId = yield select(currentProjectIdSelector)
    const updatedProject = yield call(projectApi.patch, { phase }, { path: { id: currentProjectId } }, ':id/')
    yield put(changeProjectPhaseSuccessful(updatedProject))
    window.scrollTo(0, 0)
  } catch (e) {
    yield put(error(e))
  }
}

function* projectFileUpload({ payload: { attribute, file, callback, setCancelToken } }) {
  try {
    const currentProjectId = yield select(currentProjectIdSelector)
    // Create formdata
    const formData = new FormData()
    formData.append('attribute', attribute)
    formData.append('file', file)
    // Set cancel token
    const CancelToken = axios.CancelToken
    const src = CancelToken.source()
    setCancelToken(src)
    // Upload file
    const newFile = yield call(
      projectApi.put,
      formData,
      { path: { id: currentProjectId } },
      ':id/files/',
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: callback,
        cancelToken: src.token
      }
    )
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
  try {
    const currentProjectId = yield select(currentProjectIdSelector)
    const attribute_data = {}
    attribute_data[payload] = null
    yield call(projectApi.patch, { attribute_data }, { path: { id: currentProjectId } }, ':id/')
    yield put(projectFileRemoveSuccessful(payload))
    yield put(change('editForm', payload, null))
    yield put(saveProjectAction())
  } catch (e) {
    yield put(error(e))
  }
}
