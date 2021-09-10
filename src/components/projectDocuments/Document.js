import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument } from '../../actions/documentActions'
import { IconPhoto, Button } from 'hds-react'

const Document = ({ name, file, downloadDocument }) => (
  <Button iconLeft={ <IconPhoto  size="l" />} onClick={() => downloadDocument(file)} href={file} className="document">
   
    <p className="document-title">{name}</p>
  </Button>
)

const mapDispatchToProps = {
  downloadDocument
}

export default connect(null, mapDispatchToProps)(Document)
