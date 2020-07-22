import { createSelector } from 'reselect'

const selectUser = state => state.user

export const usersSelector = createSelector(selectUser, user => user.users)
