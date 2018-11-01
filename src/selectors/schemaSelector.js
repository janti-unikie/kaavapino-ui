import { createSelector } from 'reselect'

const selectSchema = (state) => state.schema

export const schemaSelector = createSelector(
  selectSchema,
  ({ schema }) => schema
)
