import React, { useState } from 'react'
import { getFormValues } from 'redux-form'
import { EDIT_PROJECT_TIMETABLE_FORM } from '../../constants'
import { getFieldAutofillValue } from '../../utils/projectAutofillUtils'
import { useSelector } from 'react-redux'
import { Checkbox } from 'hds-react'

const DeadlineCheckbox = ({
  input: { name, value, onChange },
  meta: { error },
  autofillRule,
  label,
  className,
  disabled,
  updated
}) => {

  const formValues = useSelector(getFormValues(EDIT_PROJECT_TIMETABLE_FORM))
  let inputValue = value

  if (autofillRule) {
    inputValue = getFieldAutofillValue(autofillRule, formValues)
  }
  const [checked, setChecked] = useState(inputValue)

  const onChangeSave = () => {
    onChange(!checked)
    setChecked( !checked )
  }
  return (
    <Checkbox
      disabled={disabled}
      label={label}
      updated={updated}
      error={error}
      name={name}
      id={name}
      checked={checked}
      className={className}
      onChange={onChangeSave}
    />
  )
}

export default DeadlineCheckbox
