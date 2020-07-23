import { createSelector } from 'reselect'

const selectPhase = state => state.phase

export const phasesSelector = createSelector(selectPhase, phase => phase.phases)
