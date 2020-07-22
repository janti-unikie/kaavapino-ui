import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument } from '../../actions/documentActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Document = ({ name, file, downloadDocument }) => (
  <div onClick={() => downloadDocument(file)} href={file} className="document">
    <FontAwesomeIcon icon="file-alt" size="3x" />
    <p className="document-title">{name}</p>
  </div>
)

const mapDispatchToProps = {
  downloadDocument
}

export default connect(null, mapDispatchToProps)(Document)
