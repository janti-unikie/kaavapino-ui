import { createSelector } from 'reselect'

const selectDocument = (state) => state.document

export const selectDocuments = createSelector(
  selectDocument,
  document => document.documents
)