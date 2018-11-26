export const FETCH_PROJECT_TYPES = 'Fetch project types'
export const FETCH_PROJECT_TYPES_SUCCESSFUL = 'Fetch project types successful'
export const FETCH_PROJECT_SUBTYPES = 'Fetch project subtypes'
export const FETCH_PROJECT_SUBTYPES_SUCCESSFUL = 'Fetch project subtypes successful'

export const fetchProjectTypes = () => ({ type: FETCH_PROJECT_TYPES })
export const fetchProjectTypesSuccessful = (projectTypes) => ({ type: FETCH_PROJECT_TYPES_SUCCESSFUL, payload: projectTypes })
export const fetchProjectSubtypes = () => ({ type: FETCH_PROJECT_SUBTYPES })
export const fetchProjectSubtypesSuccessful = (projectSubTypes) => ({ type: FETCH_PROJECT_SUBTYPES_SUCCESSFUL, payload: projectSubTypes })