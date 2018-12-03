import { createSelector } from 'reselect'

const selectAuth = (state) => state.auth

export const authUserSelector = createSelector(
  selectAuth,
  (auth) => auth.user
)

export const authUserLoadingSelector = createSelector(
  selectAuth,
  (auth) => auth.isLoadingUser
)

export const userIdSelector = createSelector(
  authUserSelector,
  (user) => user ? user.profile ? user.profile.sub : null : null
)
