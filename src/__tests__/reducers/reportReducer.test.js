import { reducer as report, initialState } from '../../reducers/reportReducer'
import { FETCH_REPORTS_SUCCESSFUL } from '../../actions/reportActions'

describe('report reducer', () => {
  it('should return the initial state', () => {
    expect(report(undefined, {})).toEqual({
      ...initialState
    })
  })

  it('should handle FETCH_REPORTS_SUCCESSFUL', () => {
    expect(
      report(initialState, { type: FETCH_REPORTS_SUCCESSFUL, payload: [1, 2, 3] })
    ).toEqual({
      ...initialState,
      reports: [1, 2, 3]
    })
  })
})
