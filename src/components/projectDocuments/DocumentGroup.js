import React from 'react'
import Document from './Document'
import { Accordion } from 'hds-react'

const DocumentGroup = ({ title, documents, projectId, phaseEnded }) => {

  return (
    <div className="document-group">
      <Accordion heading={title} headingLevel={2} className="document-accordion">
        {documents.map(({ name, file, lastDownloaded, imageTemplate, id }, i) => (
          <Document
            title={title}
            phaseEnded={phaseEnded}
            lastDownloaded={lastDownloaded}
            id={id}
            imageTemplate={imageTemplate}
            projectId={projectId}
            name={name}
            file={file}
            key={i}
          />
        ))}
      </Accordion>
    </div>
  )
}

export default DocumentGroup
