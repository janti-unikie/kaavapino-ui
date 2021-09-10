import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {
  downloadReport,
  downloadReportReview,
  clearDownloadReportReview
} from '../../actions/reportActions'
import { reportsSelector, currentReportsSelector } from '../../selectors/reportSelector'
import { Form } from 'semantic-ui-react'
import ReportFilters from './ReportFilters'
import { Button } from 'hds-react'
import { useTranslation } from 'react-i18next'
import { fetchReports } from '../../actions/reportActions'
import { REPORT_FORM } from '../../constants'
import { readString } from 'react-papaparse'
import ReportPreviewModal from './ReportPreviewModal'

function ReportBuilder(props) {
  const [selectedReport, setSelectedReport] = useState(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    props.fetchReports()
  }, [])

  const handleSubmit = () => {
    clearDownloadReportReview()

    props.downloadReport({ selectedReport: selectedReport.id })
  }

  const onShowPreviewModal = () => {
    props.downloadReportReview({ selectedReport: selectedReport.id })
    setIsLoading(true)
  }

  useEffect(() => {
    setIsLoading(false)
  }, [props.currentReport])

  useEffect(() => {
    if (props.currentReport) {
      setShowPreviewModal(true)
    }
  }, [isLoading])

  const renderReportButtons = () => {
    const { reports } = props

    return reports.map(report => (
      <Button
        className="report-type-button"
        key={report.id}
        variant="secondary"
        onClick={() =>
          !selectedReport || selectedReport.id !== report.id
            ? setSelectedReport(report)
            : setSelectedReport(null)
        }
      >
        {report.name}
      </Button>
    ))
  }
  const current = props.currentReport ? readString(props.currentReport) : []

  const getHeaders = () => {
    const columns = []
    const data = current.data
   
    if (!data || !data[0]) {
      return columns
    }

    const headerRow = data[0]
   
    headerRow.forEach(column => {
      if (!headerRow.find(current => current === column)) {
        return columns.push({ Header: column, accessor: column  })
      }
    })

    return columns
  }

  const getContent = () => {
    const data = current.data

    if (!data || data.length < 2) {
      return null
    }
    const content = data.splice(1, data.length - 1)

    content.map(one => {
      one.map(item => {
        return item
      })
    })
  }

  const hidePreview = () => {
    setShowPreviewModal(false)
    clearDownloadReportReview()
  }

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
            <ReportFilters filters={selectedReport.filters} />
          </div>
        )}
        {selectedReport && selectedReport.previewable === false && (
          <Button type="submit" variant="primary" className="report-create-button">
            {t('reports.create-report')}
          </Button>
        )}
      </Form>
      {selectedReport && selectedReport.previewable === true && (
        <Button
          type="button"
          onClick={onShowPreviewModal}
          variant="primary"
          className="report-create-button"
          loadingText={t('reports.create-preview')}
          isLoading={isLoading}
        >
          {t('reports.create-preview')}
        </Button>
      )}
      <ReportPreviewModal
        open={showPreviewModal}
        handleSubmit={handleSubmit}
        handleClose={hidePreview}
        headers={getHeaders()}
        content={getContent()}
      />
    </>
  )
}

const mapStateToProps = state => ({
  reports: reportsSelector(state),
  currentReport: currentReportsSelector(state)
})

const mapDispatchToProps = {
  downloadReport,
  downloadReportReview,
  fetchReports,
  clearDownloadReportReview
}

export default reduxForm({
  form: REPORT_FORM,
  enableReinitialize: true
})(connect(mapStateToProps, mapDispatchToProps)(ReportBuilder))
