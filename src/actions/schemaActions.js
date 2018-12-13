export const FETCH_SCHEMAS = 'Fetch schemas'
export const FETCH_SCHEMAS_SUCCESSFUL = 'Fetch schemas successful'
export const SET_LATEST_EDIT_FIELD = 'Set latest edit field'
export const SET_LATEST_EDIT_FIELD_SUCCESSFUL = 'Set latest edit field successful'

export const fetchSchemas = (subtype) => ({ type: FETCH_SCHEMAS, payload: subtype })
export const fetchSchemasSuccessful = (schemas) => ({ type: FETCH_SCHEMAS_SUCCESSFUL, payload: schemas })
export const setLatestEditField = () => ({ type: SET_LATEST_EDIT_FIELD })
export const setLatestEditFieldSuccessful = (field) => ({ type: SET_LATEST_EDIT_FIELD_SUCCESSFUL, payload: field })
