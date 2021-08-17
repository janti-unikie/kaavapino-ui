import React, { useState } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { downloadReport } from '../../actions/reportActions'
import { reportsSelector } from '../../selectors/reportSelector'
import { Form } from 'semantic-ui-react'
import ReportFilters from './ReportFilters'
import { Button } from 'hds-react'

function ReportBuilder(props) {
  const [selectedReport, setSelectedReport] = useState(null)

  const handleSubmit = () => {
    
    props.downloadReport( {selectedReport} )
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
        <h2>Valitse raportti</h2>
        {renderReportButtons()}
      </div>
      <Form onSubmit={handleSubmit} className="report-builder-container">
        {selectedReport && (
          <div className="report-filter-container">
            <h2>Suodattimet</h2>
            <ReportFilters filters={reports.find(r => r.id === selectedReport).filters} />
          </div>
        )}
        {selectedReport && (
          <Button type="submit" variant="primary" className="report-create-button">
            Luo raportti
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
  downloadReport
}

export default reduxForm({
  form: 'reportForm',
  enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(ReportBuilder))
