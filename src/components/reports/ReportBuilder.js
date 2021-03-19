import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { downloadReport } from '../../actions/reportActions'
import { reportsSelector } from '../../selectors/reportSelector'
import { reportFormSelectedReportSelector } from '../../selectors/formSelector'
import { Form, Button } from 'semantic-ui-react'
import CustomField from '../input/CustomField'
import ReportFilters from './ReportFilters'

class ReportBuilder extends Component {
  formatReports = () => {
    const { reports } = this.props
    return reports.map(report => ({
      label: report.name,
      value: report.id
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.downloadReport()
  }

  render() {
    const { reports, selectedReport } = this.props
    return (
      <Form onSubmit={this.handleSubmit} className="report-builder-container">
        <div className="select-report-container">
          <h2>Valitse raportti</h2>
          <CustomField field={{ choices: this.formatReports(), name: 'report' }} />
        </div>
        {selectedReport && (
          <div className="report-filter-container">
            <h2>Suodattimet</h2>
            <ReportFilters filters={reports.find(r => r.id === selectedReport).filters} />
          </div>
        )}
        {selectedReport && (
          <Button color="default" className="report-create-button">
            Luo raportti
          </Button>
        )}
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  reports: reportsSelector(state),
  selectedReport: reportFormSelectedReportSelector(state)
})

const mapDispatchToProps = {
  downloadReport
}

export default reduxForm({
  form: 'reportForm'
})(connect(mapStateToProps, mapDispatchToProps)(ReportBuilder))
