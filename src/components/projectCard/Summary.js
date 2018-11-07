import React from 'react'

const Summary = ({ attributeData }) => {
  const formatAttributeValue = ({ type, value, empty }) => {
    if (empty) {
      return '-'
    }
    if (type === 'boolean') {
      return value ? 'Kyllä' : 'Ei'
    }
    return value
  }
  return (
    <div className='summary'>
      { attributeData.map(({ label, ...rest }) => {
        return (
          <div key={label}>
            <b>{ label }</b>
            <p>{ formatAttributeValue(rest) }</p>
          </div>
        )
      }) }
    </div>
  )
}

export default Summary