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

export const loadingSelector = createSelector(
  selectProject,
  (project) => project.loading
)
