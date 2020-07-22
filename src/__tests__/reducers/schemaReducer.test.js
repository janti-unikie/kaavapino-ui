import { reducer as schema, initialState } from '../../reducers/schemaReducer'
import { FETCH_PROJECTS } from '../../actions/projectActions'
import {
  FETCH_SCHEMAS_SUCCESSFUL,
  SET_LATEST_EDIT_FIELD_SUCCESSFUL,
  SET_ALL_EDIT_FIELDS_SUCCESSFUL
} from '../../actions/schemaActions'

describe('schema reducer', () => {
  it('should return the initial state', () => {
    expect(schema(undefined, {})).toEqual({
      ...initialState
    })
  })

  it('should handle FETCH_SCHEMAS_SUCCESSFUL', () => {
    expect(schema(initialState, { type: FETCH_SCHEMAS_SUCCESSFUL, payload: 1 })).toEqual({
      ...initialState,
      schema: 1
    })
  })

  it('should handle FETCH_PROJECTS', () => {
    const state = {
      ...initialState,
      schema: 1,
      latestEditField: 1,
      allEditFields: [1, 2, 3]
    }
    expect(schema(state, { type: FETCH_PROJECTS })).toEqual({
      ...initialState
    })
  })

  it('should handle SET_LATEST_EDIT_FIELD_SUCCESSFUL', () => {
    expect(
      schema(initialState, { type: SET_LATEST_EDIT_FIELD_SUCCESSFUL, payload: 1 })
    ).toEqual({
      ...initialState,
      latestEditField: 1
    })
  })

  it('should handle SET_ALL_EDIT_FIELDS_SUCCESSFUL', () => {
    expect(
      schema(initialState, { type: SET_ALL_EDIT_FIELDS_SUCCESSFUL, payload: [1, 2, 3] })
    ).toEqual({
      ...initialState,
      allEditFields: [1, 2, 3]
    })
  })
})
