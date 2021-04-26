import { createSelector } from 'reselect'

const selectSchema = state => state.schema

export const schemaSelector = createSelector(selectSchema, ({ schema }) => schema)

export const latestEditFieldSelector = createSelector(
  selectSchema,
  ({ latestEditField }) => latestEditField
)

export const allEditFieldsSelector = createSelector(
  selectSchema,
  ({ allEditFields }) => allEditFields
)
export const projectCardFieldsSelector = createSelector(
  selectSchema,
  ({ projectCardFields }) => projectCardFields
)

export const floorAreaSectionsSelector = createSelector(
  selectSchema,
  ({ schema }) => (schema && schema.floor_area_sections) || []
)

export const deadlineSectionsSelector = createSelector(
  selectSchema,
  ({ schema }) => (schema && schema.deadline_sections) || []
)
export const attributesSelector = createSelector(
  selectSchema,
  ({ attributes }) => attributes
)
