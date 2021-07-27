import React, { useEffect, useState } from 'react'
import { Button, LoadingSpinner } from 'hds-react'
import { downloadDocumentPreview } from '../../../actions/documentActions'
import { documentPreviewSelector } from '../../../selectors/documentSelector'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FileViewer from 'react-file-viewer'

function PreviewDocument(props) {
  const [currentDocument, setCurrentDocument] = useState()

  const parameter = new URLSearchParams(props.location.search)
  const file = parameter.get('file')
  const name = parameter.get('name')

  useEffect(() => {
    if (file) {
      props.downloadDocumentPreview(file)
    }
  }, [])

  useEffect(() => {
    setCurrentDocument(props.documentPreview)
  }, [props.documentPreview])

  const onClose = () => {
    props.history.goBack()
  }

  if (!currentDocument) {
    return <LoadingSpinner />
  }

  const onError = e => {
    console.log(e, 'error in file-viewer')
  }

  return (
    <div className="documents-page-container">
      <h2>{name}</h2>
      <div>
        <FileViewer fileType="pdf" filePath="http://localhost:3000/selostus_template_kaavapino_mvp_muokattu_2.pdf" onError={onError} />
        <Button variant="supplementary" onClick={() => onClose()} className="document">
          Sulje
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    documentPreview: documentPreviewSelector(state)
  }
}

const mapDispatchToProps = {
  downloadDocumentPreview
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PreviewDocument))
