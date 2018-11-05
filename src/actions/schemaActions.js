export const FETCH_SCHEMAS = 'Fetch schemas'
export const FETCH_SCHEMAS_SUCCESSFUL = 'Fetch schemas successful'

export const fetchSchemas = (type) => ({ type: FETCH_SCHEMAS, payload: type })
export const fetchSchemasSuccessful = (schemas) => ({ type: FETCH_SCHEMAS_SUCCESSFUL, payload: schemas })
