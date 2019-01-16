import React from 'react'
import DateTime from 'react-datetime'

const CustomDateTime = ({ input, ...custom }) => {
  const formatDate = (value) => {
    if (!isNaN(new Date(value))) {
      return new Date(value)
    }
    return value
  }

  return(
    <DateTime
      dateFormat='DD.MM.YYYY'
      timeFormat={false}
      { ...input }
      value={formatDate(input.value)}
      className={custom.disabled ? 'disabled' : ''}
      locale='fi'
      {...custom}
      inputProps={{ readOnly: true }}
    />
  )
}

export default CustomDateTime