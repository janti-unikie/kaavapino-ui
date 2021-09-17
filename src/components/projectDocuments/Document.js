import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument, downloadDocumentPreview } from '../../actions/documentActions'
import { Button, IconPhoto } from 'hds-react'
import { Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

function Document({
  name,
  file,
  lastDownloaded,
  downloadDocument,
  downloadDocumentPreview,
  phaseEnded,
  image_template

}) {

  const {t} = useTranslation()
  return (
    <>
      <Grid columns="equal" className="document-row ">
        <Grid.Column>
          {image_template && <IconPhoto className="image-template-icon" />}
          <span className="document-title">{name}</span>
        </Grid.Column>
        <Grid.Column>
          <span className="document-title">{lastDownloaded ? dayjs(lastDownloaded).format('DD.MM.YYYY') : ''}</span>
        </Grid.Column>
        {!phaseEnded &&  <Grid.Column textAlign="right">
       
          <Button
            variant="supplementary"
            onClick={() => downloadDocument({name, file})}
            href={file}
            className="document"
          >
            {t('project.load')}
          </Button>
          <Button
            variant="supplementary"
            onClick={() => downloadDocumentPreview({name, file})}
            href={file}
            className="document"
          >
            {t('project.load-preview')}
          </Button>
          
        </Grid.Column>
        }
      </Grid>
    
    </>
  )
}

const mapDispatchToProps = {
  downloadDocument,
  downloadDocumentPreview
}

export default withRouter(connect(null, mapDispatchToProps)(Document))
