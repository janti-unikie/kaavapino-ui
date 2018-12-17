export const FETCH_REPORTS = 'Fetch reports'
export const FETCH_REPORTS_SUCCESSFUL = 'Fetch reports successful'

export const fetchReports = () => ({ type: FETCH_REPORTS })
export const fetchReportsSuccessful = (reports) => ({ type: FETCH_REPORTS_SUCCESSFUL, payload: reports })