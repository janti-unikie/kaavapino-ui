import { createSelector } from 'reselect'

const selectProjectType = (state) => state.projectType

export const projectTypesSelector = createSelector(
  selectProjectType,
  ({ projectTypes }) => projectTypes
)
