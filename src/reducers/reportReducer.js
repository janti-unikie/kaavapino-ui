import {
  FETCH_REPORTS_SUCCESSFUL,
  DOWNLOAD_REPORT_REVIEW_SUCCESSFUL,
  CLEAR_REPORT_PREVIEW
} from '../actions/reportActions'

export const initialState = {
  reports: [],
  currentReport: null
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_REPORTS_SUCCESSFUL:
      return {
        ...state,
        reports: payload
      }
    case DOWNLOAD_REPORT_REVIEW_SUCCESSFUL:
      return {
        ...state,
        currentReport: payload
      }
      case CLEAR_REPORT_PREVIEW:
      return {
        ...state,
        currentReport: null
      }
    default:
      return { ...state }
  }
}
