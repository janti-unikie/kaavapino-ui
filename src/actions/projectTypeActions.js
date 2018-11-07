export const FETCH_PROJECT_TYPES = 'Fetch project types'
export const FETCH_PROJECT_TYPES_SUCCESSFUL = 'Fetch project types successful'

export const fetchProjectTypes = () => ({ type: FETCH_PROJECT_TYPES })
export const fetchProjectTypesSuccessful = (projectTypes) => ({ type: FETCH_PROJECT_TYPES_SUCCESSFUL, payload: projectTypes })