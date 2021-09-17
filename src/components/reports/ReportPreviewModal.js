import React from 'react'
import { Modal } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { Button } from 'hds-react'
import ReportTable from './ReportTable'

function ReportPreviewModal({
  open,
  handleClose,
  report,
  headers,
  handleSubmit,
  noData
}) {
  const { t } = useTranslation()

  const renderReportContent = () => {
    if (!report || report.length === 0) {
      return null
    }

    return report.map(current => {
      return (
        <div key={current.date} className="report-date">
          {t('reports.presentation-report.kylk-title', { date: current.date })}
          {current.rows && <ReportTable columns={headers} data={current.rows} />}
        </div>
      )
    })
  }
  return (
    <Modal
      className="preview-modal"
      size={'large'}
      onClose={handleClose}
      open={open}
      closeIcon
    >
      <Modal.Actions>
        <span>
          <Button variant="secondary" type="button" onClick={handleSubmit}>
            {t('reports.create-report')}
          </Button>
        </span>
      </Modal.Actions>
      <Modal.Content>
        <h3>{t('reports.presentation-report.title')}</h3>
        {!noData && <div>{t('reports.presentation-report.infoText')}</div>}
        {!noData && renderReportContent()}
        {noData && (
          <div className="empty-report">
            {t('reports.presentation-report.empty-report')}
          </div>
        )}
      </Modal.Content>
    </Modal>
  )
}

export default ReportPreviewModal
