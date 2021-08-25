import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument, downloadDocumentPreview } from '../../actions/documentActions'
import { Button } from 'hds-react'
import { Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const Document = props => {
  
  return (
    <>
      <Grid columns="equal" className="document-row ">
        <Grid.Column>
          <span className="document-title">{props.name}</span>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            variant="supplementary"
            onClick={() => props.downloadDocument(props.file)}
            href={props.file}
            className="document"
          >
            Lataa
          </Button>
          <Button
            variant="supplementary"
            onClick={() => props.downloadDocumentPreview(props.file)}
            href={props.file}
            className="document"
          >
            Esikatsele
          </Button>
        </Grid.Column>
      </Grid>
    </>
  )
}

const mapDispatchToProps = {
  downloadDocument,
  downloadDocumentPreview,
  
}

export default withRouter(connect(null, mapDispatchToProps)(Document))
