import React from 'react'
import { Radio } from 'semantic-ui-react'

const ToggleButton = ({
  input: { value, name, ...rest },
  meta: { error },
  ...custom
}) => {
  return (
    <div className={'radio-input-container'}>
      <Radio
        toggle
        label={custom.label}
        placeholder={custom.placeholder}
        onBlur={custom.onBlur}
        error={error}
        name={name}
        onChange={() => rest.onChange(!value)}
        checked={value ? true : false }
      />
    </div>
  )
}

export default ToggleButton
