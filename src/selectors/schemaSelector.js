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
