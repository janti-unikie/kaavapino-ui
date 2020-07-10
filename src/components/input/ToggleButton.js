import React from 'react'
import { Radio } from 'semantic-ui-react'

const ToggleButton = ({ input: { value, name, label, ...rest }, meta: { error }, ...custom }) => {
  return (
    <div className={'radio-input-container'}>
      <Radio
        toggle
        label={label}
        { ...custom }
        error={ error }
        name={ name }
        onChange={() => rest.onChange(!value)}
        checked={value}
      />
    </div>
  )
}

export default ToggleButton