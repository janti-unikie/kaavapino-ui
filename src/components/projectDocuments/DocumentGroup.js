import React from 'react'
import Document from './Document'
import { Accordion } from 'hds-react'

const DocumentGroup = ({ title, documents, projectId, phaseEnded }) => {

  return (
    <div className="document-group">
      <Accordion heading={title} headingLevel={2} className="document-accordion">
        {documents.map(({ name, file, last_downloaded, image_template, id }, i) => (
          <Document
            title={title}
            phaseEnded={phaseEnded}
            lastDownloaded={last_downloaded}
            id={id}
            image_template={image_template}
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
