import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Document = ({ name, file }) => (
  <a href={file} className='document'>
    <FontAwesomeIcon icon='file-alt' size='3x' />
    <p className='document-title'>{ name }</p>
  </a>
)

export default Document