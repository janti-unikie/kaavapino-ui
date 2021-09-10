import React from 'react'
import { Modal } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { Button} from 'hds-react'
import ReportTable from './ReportTable'

function ReportPreviewModal(props) {
  const { t } = useTranslation()
  return (
    <Modal
      className="form-modal edit-floor-area-form-modal"
      size={'large'}
      onClose={props.handleClose}
      open={props.open}
      closeIcon
    >
      <Modal.Header>{t('floor-areas.title')}</Modal.Header>
      <Modal.Content>
        <ReportTable columns={props.headers} data={['jee']} />
      </Modal.Content>
      <Modal.Actions>
        <span className="form-buttons">
          <Button variant="primary" type="button" onClick={props.handleSubmit}>
            {t('reports.create-report')}
          </Button>
        </span>
      </Modal.Actions>
    </Modal>
  )
}

export default ReportPreviewModal
