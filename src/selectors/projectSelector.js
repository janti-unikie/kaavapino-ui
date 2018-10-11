import { createSelector } from 'reselect'

const selectProject = (state) => state.project

export const projectInputsSelector = createSelector(
  selectProject,
  (project) => project.inputs
)

export const ownProjectsSelector = createSelector(
  selectProject,
  (project) => project.ownProjects
)

export const allProjectsSelector = createSelector(
  selectProject,
  (project) => project.allProjects
)
