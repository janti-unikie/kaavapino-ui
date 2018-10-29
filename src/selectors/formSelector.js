import { createSelector } from 'reselect'

const selectForm = (state) => state.form

export const modalSelector = createSelector(
  selectForm,
  (form) => form.modal
)
