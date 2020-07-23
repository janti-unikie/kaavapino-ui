import React from 'react'
import Document from './Document'

const DocumentGroup = ({ title, documents }) => (
  <div className="document-group">
    <h1>{title}</h1>
    {documents.map(({ name, file }, i) => (
      <Document name={name} file={file} key={i} />
    ))}
  </div>
)

export default DocumentGroup
