import { createSelector } from 'reselect'

const selectComment = (state) => state.comment

export const commentsSelector = createSelector(
  selectComment,
  ({ comments }) => comments
)

export const commentsLoadingSelector = createSelector(
  selectComment,
  ({ commentsLoading }) => commentsLoading
)

export const amountOfCommentsToShowSelector = createSelector(
  selectComment,
  ({ amountOfCommentsToShow }) => amountOfCommentsToShow
)

export const totalCommentsSelector = createSelector(
  selectComment,
  ({ totalComments }) => totalComments
)

export const pollingCommentsSelector = createSelector(
  selectComment,
  ({ pollingComments }) => pollingComments
)
