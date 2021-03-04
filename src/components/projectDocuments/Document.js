import React from 'react'
import { connect } from 'react-redux'
import { downloadDocument } from '../../actions/documentActions'
import { IconPhoto } from 'hds-react'

const Document = ({ name, file, downloadDocument }) => (
  <div onClick={() => downloadDocument(file)} href={file} className="document">
    <IconPhoto  size="l" />
    <p className="document-title">{name}</p>
  </div>
)

const mapDispatchToProps = {
  downloadDocument
}

export default connect(null, mapDispatchToProps)(Document)
