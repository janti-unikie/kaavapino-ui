import React from 'react'
import DateTime from 'react-datetime'

const CustomDateTime = ({ input, ...custom }) => {
  const formatDate = value => {
    if (!isNaN(new Date(value))) {
      return new Date(value)
    }
    return value
  }

  return (
    <DateTime
      dateFormat="DD.MM.YYYY"
      timeFormat="HH:mm"
      value={formatDate(input.value)}
      {...input}
      {...custom}
      locale="fi"
      closeOnSelect={true}
      placeHolder="jee"
    />
  )
}

export default CustomDateTime
