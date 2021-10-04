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
import { parseKYLKReport } from './reportUtils'
import { findIndex } from 'lodash'
import { LoadingSpinner } from 'hds-react'

function ReportBuilder(props) {
  const [selectedReport, setSelectedReport] = useState(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentReportData, setCurrentReportData] = useState(null)

  const { t } = useTranslation()

  useEffect(() => {
    props.clearDownloadReportReview()
    props.fetchReports()
  }, [])

  const handleSubmit = () => {
    props.downloadReport({ selectedReport: selectedReport.id })
  }

  useEffect(() => {
    setCurrentReportData(props.currentReport)
  }, [props.currentReport])

  useEffect(() => {
    if (currentReportData) {
      setShowPreviewModal(true)
    }
    setIsLoading(false)
  }, [currentReportData])

  useEffect(() => {
    setShowPreviewModal(false)
    setIsLoading(false)
    setCurrentReportData(null)
    props.initialize(null)
  }, [selectedReport])

  const onShowPreviewModal = () => {
    props.downloadReportReview({ selectedReport: selectedReport.id })
    setIsLoading(true)
  }
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
  const current = currentReportData ? readString(currentReportData) : []

  const getHeaders = () => {
    const columns = []
    const data = current.data

    if (!data || !data[0]) {
      return columns
    }

    const headerRow = data[0]

    headerRow.forEach(column => {
      if (column === 'Selite') {
        return columns.push({
          Header: column,
          accessor: getNonDuplicateName(column, columns),
          minWidth: 200,
          width: 200
        })
      }
      return columns.push({
        Header: column,
        accessor: getNonDuplicateName(column, columns)
      })
    })

    return columns
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const getNonDuplicateName = (column, list) => {
    if (!list || list.length === 0) {
      return column
    }
    if (
      findIndex(list, item => {
        return item.accessor === column
      }) !== -1
    ) {
      const randomNumber = getRandomInt(10000)
      return column + randomNumber
    } else {
      return column
    }
  }

  const headers = getHeaders()

  const getContent = () => {
    const data = current.data

    if (!data || data.length < 2) {
      return null
    }

    const returnValue = []

    const content = data.slice(1, data.length - 1)

    content.forEach(row => {
      const rowValues = {}

      row.forEach((column, index) => {
        const header = headers[index].accessor
        rowValues[header] = column
      })
      returnValue.push(rowValues)
    })
    return returnValue
  }

  const hidePreview = () => {
    setShowPreviewModal(false)
    setIsLoading(false)
    setCurrentReportData(null)
    props.clearDownloadReportReview()
  }

  const content = getContent()

  if (!props.reports || props.reports.length === 0) {
    return <LoadingSpinner />
  }

  const noData = !headers || headers.length === 0 || !content || content.length === 0

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
        noData={noData}
        handleSubmit={handleSubmit}
        handleClose={hidePreview}
        headers={headers}
        report={parseKYLKReport(headers, content)}
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
