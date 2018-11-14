import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Document = ({ title, disabled }) => {
  return (
    <div className={`document${disabled ? ' disabled' : ''}`}>
      <FontAwesomeIcon icon='file-alt' size='3x' />
      <p className='document-title'>{ title }</p>
    </div>
  )
}

export default Document