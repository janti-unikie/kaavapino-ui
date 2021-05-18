import axios from 'axios'
import { takeLatest, takeEvery, put, all, call, select } from 'redux-saga/effects'
import { isEqual } from 'lodash'
import { push } from 'connected-react-router'
import { actions as toastrActions } from 'react-redux-toastr'
import {
  editFormSelector,
  deadlineModalSelector,
  newProjectFormSelector,
  editFloorAreaFormSelector,
  editProjectTimetableFormSelector
} from '../selectors/formSelector'
import {
  currentProjectSelector,
  currentProjectIdSelector,
  amountOfProjectsToShowSelector,
  totalOwnProjectsSelector,
  totalProjectsSelector,
  ownProjectsSelector,
  projectsSelector,
  amountOfProjectsToIncreaseSelector,
  selectedPhaseSelector
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
  SAVE_PROJECT_TIMETABLE,
  SAVE_PROJECT,
  saveProjectSuccessful,
  CHANGE_PROJECT_PHASE,
  changeProjectPhaseSuccessful,
  changeProjectPhaseFailure,
  VALIDATE_PROJECT_FIELDS,
  validateProjectFieldsSuccessful,
  PROJECT_FILE_UPLOAD,
  PROJECT_FILE_REMOVE,
  projectFileRemoveSuccessful,
  saveProject as saveProjectAction,
  PROJECT_SET_DEADLINES,
  projectSetDeadlinesSuccessful,
  initializeProject as initializeProjectAction,
  FETCH_PROJECT_DEADLINES,
  fetchProjectDeadlinesSuccessful,
  GET_PROJECT,
  getProjectSuccessful,
  RESET_PROJECT_DEADLINES,
  getProjectSnapshotSuccessful,
  GET_PROJECT_SNAPSHOT,
  getProjectsOverviewFloorAreaSuccessful,
  GET_PROJECTS_OVERVIEW_FLOOR_AREA,
  getProjectsOverviewBySubtypeSuccessful,
  GET_PROJECTS_OVERVIEW_BY_SUBTYPE,
  getProjectsOverviewFiltersSuccessful,
  GET_PROJECTS_OVERVIEW_FILTERS,
  getExternalDocumentsSuccessful,
  GET_EXTERNAL_DOCUMENTS,
  GET_PROJECTS_OVERVIEW_MAP_DATA,
  getProjectsOverviewMapDataSuccessful
} from '../actions/projectActions'
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form'
import { error } from '../actions/apiActions'
import { setAllEditFields } from '../actions/schemaActions'
import projectUtils from '../utils/projectUtils'
import {
  projectApi,
  projectDeadlinesApi,
  overviewFloorAreaApi,
  overviewBySubtypeApi,
  overviewFiltersApi,
  externalDocumentsApi,
  overviewMapApi
} from '../utils/api'
import { usersSelector } from '../selectors/userSelector'
import {
  NEW_PROJECT_FORM,
  EDIT_FLOOR_AREA_FORM,
  EDIT_PROJECT_FORM,
  EDIT_PROJECT_TIMETABLE_FORM
} from '../constants'
import i18 from 'i18next'
import { showField } from '../utils/projectVisibilityUtils'
import { checkDeadlines } from '../components/ProjectTimeline/helpers/helpers'
import dayjs from 'dayjs'

export default function* projectSaga() {
  yield all([
    takeLatest(FETCH_PROJECTS, fetchProjects),
    takeLatest(FETCH_PROJECT_DEADLINES, fetchProjectDeadlines),
    takeLatest(INITIALIZE_PROJECT, initializeProject),
    takeLatest(CREATE_PROJECT, createProject),
    takeLatest(SAVE_PROJECT_BASE, saveProjectBase),
    takeLatest(SAVE_PROJECT_FLOOR_AREA, saveProjectFloorArea),
    takeLatest(SAVE_PROJECT_TIMETABLE, saveProjectTimetable),
    takeLatest(SAVE_PROJECT, saveProject),
    takeLatest(CHANGE_PROJECT_PHASE, changeProjectPhase),
    takeLatest(VALIDATE_PROJECT_FIELDS, validateProjectFields),
    takeLatest(PROJECT_FILE_UPLOAD, projectFileUpload),
    takeLatest(PROJECT_FILE_REMOVE, projectFileRemove),
    takeLatest(PROJECT_SET_DEADLINES, projectSetDeadlinesSaga),
    takeLatest(INCREASE_AMOUNT_OF_PROJECTS_TO_SHOW, increaseAmountOfProjectsToShowSaga),
    takeLatest(SORT_PROJECTS, sortProjectsSaga),
    takeLatest(SET_AMOUNT_OF_PROJECTS_TO_INCREASE, setAmountOfProjectsToIncreaseSaga),
    takeEvery(GET_PROJECT, getProject),
    takeLatest(RESET_PROJECT_DEADLINES, resetProjectDeadlines),
    takeLatest(GET_PROJECT_SNAPSHOT, getProjectSnapshot),
    takeLatest(GET_PROJECTS_OVERVIEW_FLOOR_AREA, getProjectsOverviewFloorArea),
    takeLatest(GET_PROJECTS_OVERVIEW_BY_SUBTYPE, getProjectsOverviewBySubtype),
    takeLatest(GET_PROJECTS_OVERVIEW_FILTERS, getProjectsOverviewFilters),
    takeLatest(GET_EXTERNAL_DOCUMENTS, getExternalDocumentsSaga),
    takeLatest(GET_PROJECTS_OVERVIEW_MAP_DATA, getProjectOverviewMapDataSaga)
  ])
}

function* resetProjectDeadlines({ payload: projectId }) {
  try {
    yield call(
      projectApi.get,
      { path: { projectId } },
      ':projectId/?generate_schedule=true'
    )
  } catch (e) {
    yield put(error(e))
  }
}

function* getProject({ payload: projectId }) {
  try {
    const timelineProject = yield call(
      projectApi.get,
      { path: { projectId } },
      ':projectId/'
    )
    yield put(getProjectSuccessful(timelineProject))
  } catch (e) {
    yield put(error(e))
  }
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

function* fetchProjectDeadlines({ payload: projectId }) {
  try {
    const deadlines = yield call(
      projectDeadlinesApi.get,
      { path: { projectId } },
      ':projectId/'
    )
    yield put(fetchProjectDeadlinesSuccessful(deadlines))
  } catch (e) {
    yield put(error(e))
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
    const amountOfProjectsToShow = yield select(totalProjectsSelector)
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

function* getProjectSnapshot({ payload }) {
  try {
    let query = {}

    if (payload.phase) {
      query = { phase: payload.phase }
    } else if (payload.date) {
      query = { snapshot: payload.date }
    }
    const project = yield call(
      projectApi.get,
      { path: { projectId: payload.projectId }, query: query },
      ':projectId/'
    )

    yield put(getProjectSnapshotSuccessful(project))
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
    if (initial[key] !== undefined && isEqual(values[key], initial[key])) {
      return
    }

    if (values[key] === '') {
      attribute_data[key] = null
    } else {
      attribute_data[key] = values[key]
    }
    let fieldSetName

    if (sections) {
      // When editing a field inside fieldset, the fieldset is not included by default.
      // This workaround adds fieldset if field is inside fieldset.
      sections.some(title => {
        title.fields.some(fieldset => {
          const fieldsetAttributes = fieldset.fieldset_attributes

          fieldsetAttributes.forEach(value => {
            if (value.name === key) {
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
    if (initialFieldSetValues) {
      attribute_data = Object.assign({}, initialFieldSetValues[0], attribute_data)
    }
  })
  return attribute_data
}

function* saveProjectBase({ payload }) {
  yield put(startSubmit(NEW_PROJECT_FORM))
  const { values } = yield select(newProjectFormSelector)
  const currentProjectId = yield select(currentProjectIdSelector)
  if (payload && payload.archived) {
    values.archived = payload.archived
  }
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
function* saveProjectTimetable() {
  yield put(startSubmit(EDIT_PROJECT_TIMETABLE_FORM))
  const { initial, values } = yield select(editProjectTimetableFormSelector)
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
      yield put(setSubmitSucceeded(EDIT_PROJECT_TIMETABLE_FORM))

      if (!checkDeadlines(updatedProject.deadlines)) {
        yield put(
          toastrActions.add({
            type: 'success',
            title: i18.t('messages.deadlines-successfully-saved')
          })
        )
      } else {
        yield put(
          toastrActions.add({
            type: 'warning',
            title: i18.t('messages.deadlines-successfully-saved'),
            message: i18.t('messages.check-timetable'),
            options: {
              timeOut: 5000
            }
          })
        )
      }
      yield put(initializeProjectAction(currentProjectId))
    } catch (e) {
      yield put(stopSubmit(EDIT_PROJECT_TIMETABLE_FORM, e.response.data))
    }
  }
}

function* saveProject() {
  const currentProjectId = yield select(currentProjectIdSelector)
  const editForm = yield select(editFormSelector) || {}
  const { initial, values } = editForm
  if (values) {
    const selectedPhase = yield select(selectedPhaseSelector)
    const schema = yield select(schemaSelector)
    const currentSchema = schema.phases.find(s => s.id === selectedPhase)
    const { sections } = currentSchema
    const changedValues = getChangedAttributeData(values, initial, sections)

    const attribute_data = changedValues

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
}

function* validateProjectFields({ payload: formValues }) {
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
      fields.forEach((field, fieldIndex) => {
        // Only validate visible fields
        if (showField(field, formValues)) {
          // Matrices can contain any kinds of fields, so
          // we must go through them separately
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
            if (fieldset_attributes) {
              fieldset_attributes.forEach(field => {
                if (attributeData[fields[fieldIndex].name]) {
                  attributeData[fields[fieldIndex].name].forEach(attribute => {
                    if (
                      projectUtils.isFieldMissing(field.name, field.required, attribute)
                    ) {
                      missingFields = true
                    }
                  })
                } else {
                  if (
                    projectUtils.isFieldMissing(field.name, field.required, attributeData)
                  ) {
                    missingFields = true
                  }
                }
              })
            }
          } else if (
            projectUtils.isFieldMissing(field.name, field.required, attributeData)
          ) {
            missingFields = true
          }
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

    let fieldSetIndex = []
    let currentFieldName = attribute

    const lastIndex = attribute.lastIndexOf('.')
    if (lastIndex !== -1) {
      const splitted = attribute.split('.')

      splitted.forEach(value => {
        const firstBracket = value.indexOf('[')
        const secondBracket = value.indexOf(']')

        const fieldSet = attribute.substring(0, firstBracket)
        const index = attribute.substring(firstBracket + 1, secondBracket)
        currentFieldName = attribute.substring(lastIndex + 1, attribute.length)

        if (fieldSet !== '' && index !== '') {
          const returnObject = {
            parent: fieldSet,
            index: index
          }
          fieldSetIndex.push(returnObject)
        }
      })
    }

    // Create formdata
    const formData = new FormData()
    formData.append('attribute', currentFieldName)
    formData.append('file', file)
    formData.append('description', description)

    if (fieldSetIndex && fieldSetIndex.length > 0) {
      formData.append('fieldset_path', JSON.stringify(fieldSetIndex))
    }
    // Set cancel token
    const CancelToken = axios.CancelToken
    const src = CancelToken.source()
    setCancelToken(src)
    // Upload file
    yield call(
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
function* getProjectsOverviewFloorArea({ payload }) {
  let query = {}

  const keys = Object.keys(payload)

  keys.forEach(key => {
    if (key === 'vuosi') {
      const values = payload[key].sort()
      const startDate = dayjs(new Date(values[0], 0, 1)).format('YYYY-MM-DD')
      const endDate = dayjs(new Date(values[0], 11, 31)).format('YYYY-MM-DD')

      query = {
        ...query,
        start_date: startDate,
        end_date: endDate
      }
    } else {
      query = {
        ...query,
        [key]: payload[key]
      }
    }
  })
 
  try {
    const floorArea = yield call(overviewFloorAreaApi.get, { query: query })
    yield put(getProjectsOverviewFloorAreaSuccessful(floorArea))
  } catch (e) {
    yield put(error(e))
  }
}
function* getProjectsOverviewBySubtype({ payload }) {
  let query = {}

  const keys = Object.keys(payload)

  keys.forEach(key => {
    if (key === 'vuosi') {
      const values = payload[key].sort()
      const startDate = dayjs(new Date(values[0], 0, 1)).format('YYYY-MM-DD')
      const endDate = dayjs(new Date(values[0], 11, 31)).format('YYYY-MM-DD')
      
      query = {
        ...query,
        start_date: startDate,
        end_date: endDate
      }
    } else {
      query = {
        ...query,
        [key]: payload[key]
      }
      
    }
  })
  try {
    const bySubtype = yield call(overviewBySubtypeApi.get, { query: query })
    yield put(getProjectsOverviewBySubtypeSuccessful(bySubtype))
  } catch (e) {
    yield put(error(e))
  }
}
function* getProjectsOverviewFilters() {
  try {
    const filters = yield call(overviewFiltersApi.get)
    yield put(getProjectsOverviewFiltersSuccessful(filters))
  } catch (e) {
    yield put(error(e))
  }
}
  function* getExternalDocumentsSaga({ payload: projectId }) {
    try {
      const documents = yield call(externalDocumentsApi.get, { path: { id: projectId } })
      yield put(getExternalDocumentsSuccessful(documents))
    } catch (e) {
      yield put(error(e))
    }
  }

  function* getProjectOverviewMapDataSaga({payload}) {

    let query = {}

    const keys = Object.keys(payload)
  
    keys.forEach(key => {
        query = {
          ...query,
          [key]: payload[key]
        }
      }
    )
    try {
      const mapData = yield call(overviewMapApi.get,  { query: query })
      yield put(getProjectsOverviewMapDataSuccessful(mapData))
    } catch (e) {
      yield put(error(e))
    }
  }
