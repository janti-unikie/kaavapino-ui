import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CustomCheckbox = ({
  input: { name, value, label, onChange, className, disabled },
  meta: { error },
  ...custom
}) => {
  const onChangeSave = data => {
    onChange(data.checked)
    if (custom.handleSave) {
      custom.handleSave(data.checked)
    }
  }

  const currentValue = !value ? false : true
  return (
    <Checkbox
      {...custom}
      disabled={disabled}
      label={label}
      error={error}
      name={name}
      className={className}
      onChange={(e, data) => onChangeSave(data)}
      defaultChecked={currentValue}
    />
  )
}

export default CustomCheckbox
