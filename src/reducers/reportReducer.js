import {
  FETCH_REPORTS_SUCCESSFUL
} from '../actions/reportActions'

const initialState = {
  reports: []
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_REPORTS_SUCCESSFUL: return ({
      ...state,
      reports: payload
    })

    default: return ({ ...state })
  }
}