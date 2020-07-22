export const FETCH_SCHEMAS = 'Fetch schemas'
export const FETCH_SCHEMAS_SUCCESSFUL = 'Fetch schemas successful'
export const SET_LATEST_EDIT_FIELD = 'Set latest edit field'
export const SET_LATEST_EDIT_FIELD_SUCCESSFUL = 'Set latest edit field successful'
export const SET_ALL_EDIT_FIELDS = 'Set all edit fields'
export const SET_ALL_EDIT_FIELDS_SUCCESSFUL = 'Set all edit fields successful'

export const fetchSchemas = subtype => ({ type: FETCH_SCHEMAS, payload: subtype })
export const fetchSchemasSuccessful = schemas => ({
  type: FETCH_SCHEMAS_SUCCESSFUL,
  payload: schemas
})
export const setLatestEditField = () => ({ type: SET_LATEST_EDIT_FIELD })
export const setLatestEditFieldSuccessful = field => ({
  type: SET_LATEST_EDIT_FIELD_SUCCESSFUL,
  payload: field
})
export const setAllEditFields = () => ({ type: SET_ALL_EDIT_FIELDS })
export const setAllEditFieldsSuccessful = fields => ({
  type: SET_ALL_EDIT_FIELDS_SUCCESSFUL,
  payload: fields
})
