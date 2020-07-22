import { createSelector } from 'reselect'

const selectDocument = state => state.document

export const documentsSelector = createSelector(
  selectDocument,
  document => document.documents
)

export const documentsLoadingSelector = createSelector(
  selectDocument,
  ({ documentsLoading }) => documentsLoading
)
