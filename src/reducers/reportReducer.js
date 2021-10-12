import {
  FETCH_REPORTS_SUCCESSFUL,
  DOWNLOAD_REPORT_REVIEW_SUCCESSFUL,
  CLEAR_REPORT_PREVIEW,
  DOWNLOAD_REPORT_REVIEW,
  DOWNLOAD_REPORT,
  DOWNLOAD_REPORT_SUCCESSFUL
} from '../actions/reportActions'

export const initialState = {
  reports: [],
  currentReport: undefined,
  reportPreviewLoading: false,
  reportLoading: false
}

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_REPORTS_SUCCESSFUL:
      return {
        ...state,
        reports: payload
      }

    case DOWNLOAD_REPORT: {
      return { ...state, reportLoading: true }
    }

    case DOWNLOAD_REPORT_SUCCESSFUL: {
      return { ...state, reportLoading: false }
    }

    case DOWNLOAD_REPORT_REVIEW: {
      return {
        ...state,
        reportPreviewLoading: true
      }
    }
    case DOWNLOAD_REPORT_REVIEW_SUCCESSFUL:
      return {
        ...state,
        currentReport: payload,
        reportPreviewLoading: false
      }
    case CLEAR_REPORT_PREVIEW:
      return {
        ...state,
        currentReport: undefined
      }
    default:
      return { ...state }
  }
}
