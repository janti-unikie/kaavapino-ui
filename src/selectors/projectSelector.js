import { createSelector } from 'reselect'

const selectProject = (state) => state.project

export const projectsSelector = createSelector(
  selectProject,
  (project) => project.projects
)

export const currentProjectSelector = createSelector(
  selectProject,
  (project) => project.currentProject
)

export const currentProjectLoadedSelector = createSelector(
  selectProject,
  (project) => project.currentProjectLoaded
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
