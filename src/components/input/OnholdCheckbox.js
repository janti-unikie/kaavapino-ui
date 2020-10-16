import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const OnHoldCheckbox = ({
  input: { name, label, onChange },
  meta: { error },
  ...custom
}) => {
    const onChangeSave = (data) => {
        onChange(data.checked)
        custom.saveProjectBase()
    }
  return (
    <div className={'onhold-checkbox-container'}>
      <Checkbox
        label={label}
        {...custom}
        error={error}
        name={name}
        onChange={(e, data) => onChangeSave(data)}
        defaultChecked={!!custom.onhold}
        disabled={custom.disabled}
      />
    </div>
  )
}

export default OnHoldCheckbox
