import React, { useState } from 'react'
import { Checkbox } from 'hds-react'

const OnHoldCheckbox = ({
  input: { name, onChange },
  meta: { error },
  projectOnhold,
  placeholder,
  ...custom
}) => {
  const [checked, setChecked] = useState(projectOnhold)
  const onChangeSave = () => {
    setChecked(!checked)
    onChange(!checked)
    setTimeout(() => custom.saveProjectBase(), 200)
  }

  return (
    <Checkbox
      label={placeholder}
      error={error}
      name={name}
      id={name}
      onChange={onChangeSave}
      checked={checked}
      disabled={custom.disabled}
    />
  )
}

export default OnHoldCheckbox
