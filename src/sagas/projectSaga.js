import axios from 'axios'
import { takeLatest, put, all, call, select } from 'redux-saga/effects'
import { isEqual } from 'lodash'
import { push } from 'connected-react-router'
import { actions as toastrActions } from 'react-redux-toastr'
import {
  editFormSelector,
  deadlineModalSelector,
  newProjectFormSelector,
  editFloorAreaFormSelector
} from '../selectors/formSelector'
import {
  currentProjectSelector,
  currentProjectIdSelector,
  amountOfProjectsToShowSelector,
  totalOwnProjectsSelector,
  totalProjectsSelector,
  ownProjectsSelector,
  projectsSelector,
  amountOfProjectsToIncreaseSelector
} from '../selectors/projectSelector'
import { schemaSelector } from '../selectors/schemaSelector'
import { userIdSelector } from '../selectors/authSelector'
import { phasesSelector } from '../selectors/phaseSelector'
import {
  FETCH_PROJECTS,
  fetchProjectsSuccessful,
  fetchOwnProjectsSuccessful,
  fetchProjectSuccessful,
  updateProject,
  INCREASE_AMOUNT_OF_PROJECTS_TO_SHOW,
  setAmountOfProjectsToShow,
  SET_AMOUNT_OF_PROJECTS_TO_INCREASE,
  setTotalProjects,
  setTotalOwnProjects,
  SORT_PROJECTS,
  setProjects,
  setOwnProjects,
  CREATE_PROJECT,
  createProjectSuccessful,
  createOwnProjectSuccessful,
  INITIALIZE_PROJECT,
  initializeProjectSuccessful,
  SAVE_PROJECT_BASE,
  SAVE_PROJECT_FLOOR_AREA,
  SAVE_PROJECT,
  saveProjectSuccessful,
  CHANGE_PROJECT_PHASE,
  changeProjectPhaseSuccessful,
  changeProjectPhaseFailure,
  VALIDATE_PROJECT_FIELDS,
  validateProjectFieldsSuccessful,
  PROJECT_FILE_UPLOAD,
  PROJECT_FILE_REMOVE,
  projectFileUploadSuccessful,
  projectFileRemoveSuccessful,
  saveProject as saveProjectAction,
  PROJECT_SET_DEADLINES,
  projectSetDeadlinesSuccessful,
  initializeProject as initializeProjectAction
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form'
import { error } from '../actions/apiActions'
import { setLatestEditField, setAllEditFields } from '../actions/schemaActions'
import projectUtils from '../utils/projectUtils'
import { projectApi } from '../utils/api'
import { usersSelector } from '../selectors/userSelector'
import { NEW_PROJECT_FORM, EDIT_FLOOR_AREA_FORM, EDIT_PROJECT_FORM } from '../constants'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(INITIALIZE_PROJECT, initializeProject),
    takeLatest(CREATE_PROJECT, createProject),
    takeLatest(SAVE_PROJECT_BASE, saveProjectBase),
    takeLatest(SAVE_PROJECT_FLOOR_AREA, saveProjectFloorArea),
    takeLatest(SAVE_PROJECT, saveProject),
    takeLatest(CHANGE_PROJECT_PHASE, changeProjectPhase),
    takeLatest(VALIDATE_PROJECT_FIELDS, validateProjectFields),
    takeLatest(PROJECT_FILE_UPLOAD, projectFileUpload),
    takeLatest(PROJECT_FILE_REMOVE, projectFileRemove),
    takeLatest(PROJECT_SET_DEADLINES, projectSetDeadlinesSaga),
    takeLatest(INCREASE_AMOUNT_OF_PROJECTS_TO_SHOW, increaseAmountOfProjectsToShowSaga),
    takeLatest(SORT_PROJECTS, sortProjectsSaga),
    takeLatest(SET_AMOUNT_OF_PROJECTS_TO_INCREASE, setAmountOfProjectsToIncreaseSaga)
  ])
}

function* fetchProjects({ page, own = true, all = true, payload: searchQuery }) {
  try {
    const userId = yield select(userIdSelector)
    if (own) {
      let query = {
        includes_users: userId,
        page: page ? page : 1,
        ordering: '-modified_at'
      }
      if (searchQuery) {
        query = {
          includes_users: userId,
          page: page ? page : 1,
          ordering: '-modified_at',
          search: searchQuery
        }
      }
      const ownProjects = yield call(
        projectApi.get,
        {
          query
        },
        '',
        null,
        null,
        true
      )
      yield put(fetchOwnProjectsSuccessful(ownProjects.results))
      yield put(setTotalOwnProjects(ownProjects.count))
    }
    if (all) {
      let query = {
        page: page ? page : 1,
        ordering: '-modified_at'
      }
      if (searchQuery) {
        query = {
          page: page ? page : 1,
          ordering: '-modified_at',
          search: searchQuery
        }
      }
      const allProjects = yield call(
        projectApi.get,
        {
          query
        },
        '',
        null,
        null,
        true
      )
      yield put(fetchProjectsSuccessful(allProjects.results))
      yield put(setTotalProjects(allProjects.count))
    }
  } catch (e) {
    if (e.response && e.response.status !== 404) {
      yield put(error(e))
    }
  }
}

function* increaseAmountOfProjectsToShowSaga(action, howMany = null) {
  try {
    const PAGE_SIZE = 100 // Defined in backend
    const totalOwnProjects = yield select(totalOwnProjectsSelector)
    const totalProjects = yield select(totalProjectsSelector)
    const amountOfProjectsToShow = yield select(amountOfProjectsToShowSelector)
    const amountOfProjectsToIncrease = howMany
      ? howMany
      : yield select(amountOfProjectsToIncreaseSelector)
    const fetchOwn = amountOfProjectsToShow < totalOwnProjects
    const fetchAll = amountOfProjectsToShow < totalProjects

    if (fetchOwn || fetchAll) {
      if (
        Math.floor(amountOfProjectsToShow / (PAGE_SIZE + 1)) + 1 !==
        Math.floor(
          (amountOfProjectsToShow + amountOfProjectsToIncrease) / (PAGE_SIZE + 1)
        ) +
          1
      ) {
        yield call(
          fetchProjects,
          null,
          Math.floor(
            (amountOfProjectsToShow + amountOfProjectsToIncrease) / (PAGE_SIZE + 1)
          ) + 1,
          fetchOwn,
          fetchAll
        )
      }
      yield put(
        setAmountOfProjectsToShow(amountOfProjectsToShow + amountOfProjectsToIncrease)
      )
    } else {
      yield put(setAmountOfProjectsToShow(amountOfProjectsToShow))
    }
  } catch (e) {
    yield put(error(e))
  }
}

function* setAmountOfProjectsToIncreaseSaga({ payload }) {
  try {
    const amountOfProjectsToShow = yield select(amountOfProjectsToShowSelector)
    if (amountOfProjectsToShow < payload) {
      yield call(
        increaseAmountOfProjectsToShowSaga,
        null,
        payload - amountOfProjectsToShow
      )
    }
  } catch (e) {
    yield put(error(e))
  }
}

function* sortProjectsSaga({ payload: { sort, dir } }) {
  try {
    const ownProjects = yield select(ownProjectsSelector)
    const projects = yield select(projectsSelector)
    const phases = yield select(phasesSelector)
    const users = yield select(usersSelector)
    const amountOfProjectsToShow = yield select(amountOfProjectsToShowSelector)
    const options = { sort, dir, phases, amountOfProjectsToShow, users }
    yield put(setOwnProjects(projectUtils.sortProjects(ownProjects, options)))
    yield put(setProjects(projectUtils.sortProjects(projects, options)))
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
  yield put(startSubmit(NEW_PROJECT_FORM))
  const { values } = yield select(newProjectFormSelector)
  const userId = yield select(userIdSelector)
  try {
    const createdProject = yield call(projectApi.post, values)
    if (createdProject.user === userId) {
      yield put(createOwnProjectSuccessful(createdProject))
    }
    yield put(createProjectSuccessful(createdProject))
    if (createdProject.public || createdProject.user === userId) {
      yield put(push(`/${createdProject.id}/edit`))
    }
    yield put(setSubmitSucceeded(NEW_PROJECT_FORM))
  } catch (e) {
    if (e.response.status === 400) {
      yield put(stopSubmit(NEW_PROJECT_FORM, e.response.data))
    } else {
      yield put(error(e))
    }
  }
}

const getChangedAttributeData = (values, initial, sections) => {
  let attribute_data = {}
  Object.keys(values).forEach(key => {
    if (initial.hasOwnProperty(key) && isEqual(values[key], initial[key])) {
      return
    }

    if (values[key] === '') {
      attribute_data[key] = null
    } else {
      attribute_data[key] = values[key]
    }
    let fieldSetName

    if ( sections ) {
    // When editing a field inside fieldset, the fieldset is not included by default.
    // This workaround adds fieldset if field is inside fieldset.
    sections.some(title => {
        title.fields.some(fieldset => {
        const fieldsetAttributes = fieldset.fieldset_attributes
        fieldsetAttributes.forEach( value => {
          if ( value.name === key ) {
            fieldSetName = fieldset.name
            attribute_data[fieldset.name] = fieldset.name
          }
        })
        return null
        })
        return null
      })
    }
    const initialFieldSetValues = initial[fieldSetName]
    if ( initialFieldSetValues ) {
      attribute_data = Object.assign({}, initialFieldSetValues[0], attribute_data)
    }
  })
  return attribute_data
}

function* saveProjectBase() {
  yield put(startSubmit(NEW_PROJECT_FORM))
  const { values } = yield select(newProjectFormSelector)
  const currentProjectId = yield select(currentProjectIdSelector)

  if (values) {
    try {
      const updatedProject = yield call(
        projectApi.patch,
        values,
        { path: { id: currentProjectId } },
        ':id/'
      )
      yield put(updateProject(updatedProject))
      yield put(setSubmitSucceeded(NEW_PROJECT_FORM))
      yield put(initializeProjectAction(currentProjectId))
    } catch (e) {
      if (e.response.status === 400) {
        yield put(stopSubmit(NEW_PROJECT_FORM, e.response.data))
      } else {
        yield put(error(e))
      }
    }
  }
}

function* saveProjectFloorArea() {
  yield put(startSubmit(EDIT_FLOOR_AREA_FORM))
  const { initial, values } = yield select(editFloorAreaFormSelector)
  const currentProjectId = yield select(currentProjectIdSelector)

  if (values) {
    const attribute_data = getChangedAttributeData(values, initial)
    try {
      const updatedProject = yield call(
        projectApi.patch,
        { attribute_data },
        { path: { id: currentProjectId } },
        ':id/'
      )
      yield put(updateProject(updatedProject))
      yield put(setSubmitSucceeded(EDIT_FLOOR_AREA_FORM))
      yield put(
        toastrActions.add({
          type: 'success',
          title: 'Kerrosalatiedot tallennettu onnistuneesti'
        })
      )
    } catch (e) {
      if (e.response.status === 400) {
        yield put(stopSubmit(EDIT_FLOOR_AREA_FORM, e.response.data))
      } else {
        yield put(error(e))
      }
    }
  }
}

function* saveProject() {
  const currentProjectId = yield select(currentProjectIdSelector)
  const editForm = yield select(editFormSelector) || {}
  const { initial, values } = editForm
  if (values) {
    const currentProject = yield select(currentProjectSelector)
    const schema = yield select(schemaSelector)
    const currentSchema = schema.phases.find(s => s.id === currentProject.phase)
    const { sections } = currentSchema
    const changedValues = getChangedAttributeData(values, initial, sections)
    const parentNames = projectUtils.getParents(sections, changedValues)
    const formatedData = projectUtils.formatPayload(changedValues, sections, parentNames, initial)

    const attribute_data = formatedData
    try {
      const updatedProject = yield call(
        projectApi.patch,
        { attribute_data },
        { path: { id: currentProjectId } },
        ':id/'
      )
      yield put(updateProject(updatedProject))
    } catch (e) {
      if (e.response.status === 400) {
        yield put(stopSubmit(EDIT_PROJECT_FORM, e.response.data))
      } else {
        yield put(error(e))
      }
    }
  }
  yield put(saveProjectSuccessful())
  yield put(setAllEditFields())
  yield put(setLatestEditField())
}

function* validateProjectFields() {
  try {
    yield call(saveProject)
    // Gather up required data
    const currentProject = yield select(currentProjectSelector)
    const schema = yield select(schemaSelector)
    const currentSchema = schema.phases.find(s => s.id === currentProject.phase)
    const { sections } = currentSchema
    const attributeData = currentProject.attribute_data
    let missingFields = false
    // Go through every single field
    sections.forEach(({ fields }) => {
      fields.forEach(field => {
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
            fieldsets.forEach(set => {
              fieldset_attributes.forEach(({ required, name }) => {
                if (projectUtils.isFieldMissing(name, required, set)) {
                  missingFields = true
                }
              })
            })
          }
        } else if (
          projectUtils.isFieldMissing(field.name, field.required, attributeData)
        ) {
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
    const updatedProject = yield call(
      projectApi.patch,
      { phase },
      { path: { id: currentProjectId } },
      ':id/'
    )
    yield put(changeProjectPhaseSuccessful(updatedProject))
  } catch (e) {
    yield put(error(e))
    yield put(changeProjectPhaseFailure())
  }
}

function* projectFileUpload({
  payload: { attribute, file, description, callback, setCancelToken }
}) {
  try {
    const currentProjectId = yield select(currentProjectIdSelector)
    // Create formdata
    const formData = new FormData()
    formData.append('attribute', attribute)
    formData.append('file', file)
    formData.append('description', description)
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
    yield call(
      projectApi.patch,
      { attribute_data },
      { path: { id: currentProjectId } },
      ':id/'
    )
    yield put(projectFileRemoveSuccessful(payload))
    yield put(saveProjectAction())
  } catch (e) {
    yield put(error(e))
  }
}

function* projectSetDeadlinesSaga() {
  try {
    yield put(startSubmit('deadlineModal'))
    const currentProject = yield select(currentProjectSelector)
    const { values } = yield select(deadlineModalSelector)
    const deadlines = [...currentProject.deadlines].map(deadline => ({
      ...deadline,
      start: values[`${deadline.phase_name}-start`],
      deadline: values[`${deadline.phase_name}-deadline`]
    }))
    const res = yield call(
      projectApi.patch,
      { deadlines },
      { path: { id: currentProject.id } },
      ':id/'
    )
    yield put(projectSetDeadlinesSuccessful(res.deadlines))
    yield put(setSubmitSucceeded('deadlineModal'))
  } catch (e) {
    if (e.response && e.response.status === 400) {
      yield put(stopSubmit('deadlineModal', e.response.data))
      yield put(error({ custom: true, message: 'Tarkista päivämäärät!' }))
    } else {
      yield put(error(e))
    }
  }
}
