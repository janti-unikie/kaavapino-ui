export const FETCH_REPORTS = 'Fetch reports'
export const FETCH_REPORTS_SUCCESSFUL = 'Fetch reports successful'
export const DOWNLOAD_REPORT = 'Download report'
export const DOWNLOAD_REPORT_REVIEW = "Download report preview"
export const DOWNLOAD_REPORT_REVIEW_SUCCESSFUL = "Download report preview successful"
export const CLEAR_REPORT_PREVIEW = "Clear report preview"

export const fetchReports = () => ({ type: FETCH_REPORTS })
export const fetchReportsSuccessful = reports => ({
  type: FETCH_REPORTS_SUCCESSFUL,
  payload: reports
})
export const downloadReport = report => ({ type: DOWNLOAD_REPORT, payload: report })

export const downloadReportReview = report => ({ type: DOWNLOAD_REPORT_REVIEW, payload: report })

export const downloadReportReviewSuccessful = report => ({ type: DOWNLOAD_REPORT_REVIEW_SUCCESSFUL, payload: report } )

export const clearDownloadReportReview = () => ({type: CLEAR_REPORT_PREVIEW})
