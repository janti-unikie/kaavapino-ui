import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { downloadReport } from '../../actions/reportActions'
import { reportsSelector } from '../../selectors/reportSelector'
import { Form } from 'semantic-ui-react'
import ReportFilters from './ReportFilters'
import { Button } from 'hds-react'
import { useTranslation } from 'react-i18next'
import { fetchReports } from '../../actions/reportActions'
import { REPORT_FORM } from '../../constants'

function ReportBuilder(props) {
  const [selectedReport, setSelectedReport] = useState(null)

  const { t } = useTranslation()

  useEffect(() => {
    props.fetchReports()
  }, [])

  const handleSubmit = () => {
    props.downloadReport({ selectedReport })
  }

  const renderReportButtons = () => {
    const { reports } = props

    return reports.map(report => (
      <Button
        className="report-type-button"
        key={report.id}
        variant="secondary"
        onClick={() =>
          !selectedReport || selectedReport !== report.id
            ? setSelectedReport(report.id)
            : setSelectedReport(null)
        }
      >
        {report.name}
      </Button>
    ))
  }

  const { reports } = props

  return (
    <>
      <div className="select-report-container">
        <h2>{t('reports.choose-report')}</h2>
        {renderReportButtons()}
      </div>
      <Form onSubmit={handleSubmit} className="report-builder-container">
        {selectedReport && (
          <div className="report-filter-container">
            <h2>{t('reports.filters')}</h2>
            <ReportFilters filters={reports.find(r => r.id === selectedReport).filters} />
          </div>
        )}
        {selectedReport && (
          <Button type="submit" variant="primary" className="report-create-button">
            {t('reports.create-report')}
          </Button>
        )}
      </Form>
    </>
  )
}

const mapStateToProps = state => ({
  reports: reportsSelector(state)
})

const mapDispatchToProps = {
  downloadReport,
  fetchReports
}

export default reduxForm({
  form: REPORT_FORM,
  enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(ReportBuilder))
