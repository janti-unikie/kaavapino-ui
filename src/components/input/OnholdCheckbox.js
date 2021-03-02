import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const OnHoldCheckbox = ({
  input: { name, label, onChange },
  meta: { error },
  projectOnhold,
  ...custom
}) => {
    const onChangeSave = data => {
        onChange(data.checked)
        custom.saveProjectBase()
    }

  return (
    <div className={'onhold-checkbox-container'}>
      <Checkbox
        label={label}
        placeholder={custom.placeholder}
        error={error}
        name={name}
        onChange={(e, data) => onChangeSave(data)}
        defaultChecked={projectOnhold}
        disabled={custom.disabled}
      />
    </div>
  )
}

export default OnHoldCheckbox
