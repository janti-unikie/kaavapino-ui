import { createSelector } from 'reselect'

const selectProject = (state) => state.project

export const projectInputsSelector = createSelector(
  selectProject,
  (project) => project.inputs
)
