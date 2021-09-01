import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument, downloadDocumentPreview } from '../../actions/documentActions'
import { Button } from 'hds-react'
import { Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

function Document({
  name,
  file,
  lastDownloaded,
  downloadDocument,
  downloadDocumentPreview,
  phaseEnded
}) {
  return (
    <>
      <Grid columns="equal" className="document-row ">
        <Grid.Column>
          <span className="document-title">{name}</span>
        </Grid.Column>
        <Grid.Column>
          <span className="document-title">{lastDownloaded}</span>
        </Grid.Column>
        {!phaseEnded && <Grid.Column textAlign="right">
          <Button
            variant="supplementary"
            onClick={() => downloadDocument(file)}
            href={file}
            className="document"
          >
            Lataa
          </Button>
          <Button
            variant="supplementary"
            onClick={() => downloadDocumentPreview(file)}
            href={file}
            className="document"
          >
            Esikatsele
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
