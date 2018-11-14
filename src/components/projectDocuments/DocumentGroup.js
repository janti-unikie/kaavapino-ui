import React from 'react'
import Document from './Document'

const DocumentGroup = ({ title, documents }) => {
  return (
    <div className='document-group'>
      <h1>{ title }</h1>
      { documents.map(({ title, disabled }, i) => <Document title={title} disabled={disabled} key={i} />) }
    </div>
  )
}

export default DocumentGroup