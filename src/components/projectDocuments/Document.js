import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument, downloadDocumentPreview } from '../../actions/documentActions'
import { Button, IconPhoto } from 'hds-react'
import { Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'


// Special case for checking that in "Käynnistysvaihe" documents stays downloadable
export const STARTING_PHASE_INDEX = 1

function Document({
  name,
  file,
  lastDownloaded,
  downloadDocument,
  downloadDocumentPreview,
  phaseEnded,
  image_template,
  phaseIndex
}) {
  const { t } = useTranslation()
  return (
    <>
      <Grid columns="equal" className="document-row ">
        <Grid.Column>
          {image_template && <IconPhoto className="image-template-icon" />}
          <span className="document-title">{name}</span>
        </Grid.Column>
        <Grid.Column>
          <span className="document-title">
            <span>{t('project.document-last-loaded')} </span>
            {lastDownloaded ? dayjs(lastDownloaded).format('DD.MM.YYYY') : ''}
          </span>
        </Grid.Column>

        <Grid.Column textAlign="right">
          {(!phaseEnded || phaseIndex === STARTING_PHASE_INDEX) && 
            <>
              <Button
                variant="supplementary"
                onClick={() => downloadDocument({ file, name })}
                href={file}
                className="document"
              >
                {t('project.load')}
              </Button>
              <Button
                variant="supplementary"
                onClick={() => downloadDocumentPreview({ file, name })}
                href={file}
                className="document"
              >
                {t('project.load-preview')}
              </Button>
            </>
          }
        </Grid.Column>
      </Grid>
    </>
  )
}

const mapDispatchToProps = {
  downloadDocument,
  downloadDocumentPreview
}

export default withRouter(connect(null, mapDispatchToProps)(Document))
