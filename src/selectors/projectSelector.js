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

export const currentProjectSelector = createSelector(
  selectProject,
  (project) => project.currentProject
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
  ({ _metadata }) => _metadata ? _metadata.updates ? _metadata.updates : {} : {}
)
