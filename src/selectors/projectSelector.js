import { createSelector } from 'reselect'

const selectProject = (state) => state.project

export const projectsSelector = createSelector(
  selectProject,
  (project) => project.projects
)
