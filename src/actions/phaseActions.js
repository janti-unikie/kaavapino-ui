export const FETCH_PHASES = 'Fetch phases'
export const FETCH_PHASES_SUCCESSFUL = 'Fetch phases successful'

export const fetchPhases = () => ({ type: FETCH_PHASES })

export const fetchPhasesSuccessful = (phases) => ({ type: FETCH_PHASES_SUCCESSFUL, payload: phases })
