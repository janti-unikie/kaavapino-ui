import { createSelector } from 'reselect'

const selectProject = (state) => state.project

export const projectsSelector = createSelector(
  selectProject,
  (project) => project.projects
)

export const ownProjectsSelector = createSelector(
  selectProject,
  ({ ownProjects }) => ownProjects
)

export const loadingProjectsSelector = createSelector(
  selectProject,
  ({ loadingProjects }) => loadingProjects
)

export const currentProjectSelector = createSelector(
  selectProject,
  (project) => project.currentProject || null
)

export const attributeDataSelector = createSelector(
  currentProjectSelector,
  ({ attribute_data }) => attribute_data
)

export const currentProjectLoadedSelector = createSelector(
  selectProject,
  (project) => project.currentProjectLoaded
)

export const currentProjectIdSelector = createSelector(
  currentProjectSelector,
  (currentProject) => currentProject ? currentProject.id : null
)

export const savingSelector = createSelector(
  selectProject,
  (project) => project.saving
)

export const changingPhaseSelector = createSelector(
  selectProject,
  (project) => project.changingPhase
)

export const validatingSelector = createSelector(
  selectProject,
  ({ validating }) => validating
)

export const hasErrorsSelector = createSelector(
  selectProject,
  ({ hasErrors }) => hasErrors
)

export const checkingSelector = createSelector(
  selectProject,
  ({ checking }) => checking
)

export const updatesSelector = createSelector(
  currentProjectSelector,
  (currentProject = {}) => currentProject ? currentProject._metadata ? currentProject._metadata.updates ? currentProject._metadata.updates : {} : {} : {}
)

export const latestUpdateSelector = createSelector(
  updatesSelector,
  (updates) => {
    let latest = null
    let field = null
    Object.keys(updates).forEach((key) => {
      if (!latest || (new Date(updates[key].timestamp) - new Date(latest.timestamp) > 0)) {
        latest = updates[key]
        field = key
      }
    })
    return { latest, field }
  }
)

export const deadlinesSelector = createSelector(
  currentProjectSelector,
  (currentProject = { deadlines: [] }) => currentProject.deadlines
)
