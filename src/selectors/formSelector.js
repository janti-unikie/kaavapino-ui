import { createSelector } from 'reselect'

const selectForm = (state) => state.form

export const modalSelector = createSelector(
  selectForm,
  (form) => form.modal
)

export const editFormSelector = createSelector(
  selectForm,
  (form) => form.editForm
)
