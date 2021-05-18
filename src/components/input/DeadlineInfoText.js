import React from 'react'
import { getFormValues } from 'redux-form'
import { EDIT_PROJECT_TIMETABLE_FORM } from '../../constants'
import { getFieldAutofillValue } from '../../utils/projectAutofillUtils'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const DeadlineInfoText = props => {
  const formValues = useSelector(getFormValues(EDIT_PROJECT_TIMETABLE_FORM))
  let inputValue = props.input && props.input.value

  if (props.autofillRule && props.autofillRule.length > 0) {
    inputValue = getFieldAutofillValue(
      props.autofillRule,
      formValues,
      null,
      EDIT_PROJECT_TIMETABLE_FORM
    )
  }

  // Expect date in value
  let value = inputValue && dayjs(inputValue).format('DD.MM.YYYY')
  if (value === 'Invalid date') {
    value = inputValue
  }

  return (
    <div className="deadline-info-text">
      {props.label} {value}
    </div>
  )
}

export default DeadlineInfoText
