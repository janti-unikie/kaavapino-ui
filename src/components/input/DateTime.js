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
      { ...custom }
      value={formatDate(input.value)}
      locale='fi'
      inputProps={{ readOnly: true }}
    />
  )
}

export default CustomDateTime