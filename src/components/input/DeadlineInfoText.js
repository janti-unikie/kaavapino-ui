import React from 'react'
import moment from 'moment'
import { getFormValues } from 'redux-form'
import { EDIT_PROJECT_TIMETABLE_FORM } from '../../constants'
import { getFieldAutofillValue } from '../../utils/projectAutofillUtils'
import { useSelector } from 'react-redux'

const DeadlineInfoText = props => {
  const formValues = useSelector(getFormValues(EDIT_PROJECT_TIMETABLE_FORM))
  let inputValue = props.input && props.input.value

  if (props.autofillRule) {
    inputValue = getFieldAutofillValue(props.autofillRule, formValues)
  }

  // Expect date in value
  let value = inputValue && moment(inputValue).format('DD.MM.YYYY')
  if (value==='Invalid date') {
    value = inputValue
  }

  return (
    <div className="deadline-info-text">
      {props.label} {value}
    </div>
  )
}

export default DeadlineInfoText
