import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import { getFormValues } from 'redux-form'
import { EDIT_PROJECT_TIMETABLE_FORM } from '../../constants'
import { getFieldAutofillValue } from '../../utils/projectAutofillUtils'
import { useSelector } from 'react-redux'

const DeadlineCheckbox = ({
  input: { name, value, label, onChange, className },
  meta: { error },
  ...custom
}) => {

  const formValues = useSelector(getFormValues(EDIT_PROJECT_TIMETABLE_FORM))
  let inputValue = value

  if (custom.autofillRule) {
    inputValue = getFieldAutofillValue(custom.autofillRule, formValues)
  }

  const onChangeSave = data => {
    onChange(data.checked)
    if (custom.handleSave) {
      custom.handleSave(data.checked)
    }
  }
  return (
    <Checkbox
      {...custom}
      disabled={custom.disabled}
      label={label}
      error={error}
      name={name}
      defaultChecked={inputValue ? true : false}
      className={className}
      onChange={(e, data) => onChangeSave(data)}
    />
  )
}

export default DeadlineCheckbox
