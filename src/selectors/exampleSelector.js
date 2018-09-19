import { createSelector } from 'reselect'

const selectExample = (state) => state.example

export const exampleValueSelector = createSelector(
  selectExample,
  (example) => example.value
)
