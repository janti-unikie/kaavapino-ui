import { createSelector } from 'reselect'

const selectFooter = state => state.footer

export const footerSelector = createSelector(selectFooter, footer => footer.footers)
