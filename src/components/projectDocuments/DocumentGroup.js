import React from 'react'
import Document from './Document'
import { Accordion } from 'hds-react'

const DocumentGroup = ({ title, documents, projectId }) => {
  
  return (
    <div className="document-group">
     <Accordion
      heading={title}
      headingLevel={2}
      className="document-accordion"
    >
        {documents.map(({ name, file }, i) => (
      <Document title={title} projectId={projectId} name={name} file={file} key={i} />
    ))}
    </Accordion>
  
  </div>)
}

export default DocumentGroup
