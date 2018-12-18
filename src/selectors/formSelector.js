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

export const reportFormSelector = createSelector(
  selectForm,
  (form) => form.reportForm
)

export const reportFormSelectedReportSelector = createSelector(
  reportFormSelector,
  (reportForm) => reportForm ? reportForm.values ? reportForm.values.report : null : null
)
