import React from 'react'
import { Modal } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { Button} from 'hds-react'
import ReportTable from './ReportTable'

function ReportPreviewModal({open, handleClose, report, headers, handleSubmit}) {
  const { t } = useTranslation()

  const renderReportContent = () => {
    
    if ( !report || report.length === 0 ) {
        return null
    } 

    return report.map( current => {
        return ( <div key={current.date} className="report-date">
            Kylk {current.date}
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
        <span >
          <Button variant="secondary" type="button" onClick={handleSubmit}>
            {t('reports.create-report')}
          </Button>
        </span>
      </Modal.Actions>
      <Modal.Content>
        <h3>Esittelysuunnitelma</h3>
        <h4>Kaupunkiympäristölautakunnalle (KYLK) esitettäväksi suunniteltuja MAKA:n asioita</h4>
        {renderReportContent()}
      </Modal.Content>
     
    </Modal>
  )
}

export default ReportPreviewModal
