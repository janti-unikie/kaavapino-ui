import { createSelector } from 'reselect'

const selectReport = state => state.report

export const reportsSelector = createSelector(selectReport, ({ reports }) => reports)
export const currentReportsSelector = createSelector(selectReport, ({ currentReport }) => currentReport)

