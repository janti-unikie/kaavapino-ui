export const FETCH_INPUTS = 'Fetch inputs'
export const FETCH_INPUTS_SUCCESSFUL = 'Fetch inputs successful'

export const fetchInputs = (phase) => ({ type: FETCH_INPUTS, payload: phase })

export const fetchInputsSuccessful = (inputs) => ({ type: FETCH_INPUTS_SUCCESSFUL, payload: inputs })
