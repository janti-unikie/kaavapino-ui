import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { reportsSelector } from '../../selectors/reportSelector'
import { reportFormSelectedReportSelector } from '../../selectors/formSelector'
import { Form, Button } from 'semantic-ui-react'
import Field from '../input/Field'
import ReportFilters from './ReportFilters'

class ReportBuilder extends Component {
  formatReports = () => {
    const { reports } = this.props
    return reports.map((report) => ({
      label: report.name,
      value: report.id
    }))
  }

  render () {
    const { reports, selectedReport } = this.props
    console.log('selected', selectedReport)
    return (
      <Form>
        <div className='select-report-container'>
          <h2>Valitse raportti</h2>
          <Field field={{ choices: this.formatReports(), name: 'report' }} />
        </div>
        {selectedReport && (
          <div className='report-filter-container'>
            <h2>Suodattimet</h2>
            <ReportFilters filters={reports.find((r) => r.id === selectedReport).filters} />
          </div>
        )}
        { selectedReport &&
          <Button>Luo raportti</Button>
        }
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  reports: reportsSelector(state),
  selectedReport: reportFormSelectedReportSelector(state)
})

export default reduxForm({
  form: 'reportForm'
})(
  connect(
    mapStateToProps
  )(ReportBuilder)
)