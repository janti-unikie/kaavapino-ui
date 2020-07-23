import { createSelector } from 'reselect'

const selectApi = state => state.api

export const apiTokenSelector = createSelector(selectApi, ({ apiToken }) => apiToken)

export const apiLoadingTokenSelector = createSelector(
  selectApi,
  ({ loadingToken }) => loadingToken
)

export const apiInitializedSelector = createSelector(
  selectApi,
  ({ apiInitialized }) => apiInitialized
)
