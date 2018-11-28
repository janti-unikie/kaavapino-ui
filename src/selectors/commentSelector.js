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
