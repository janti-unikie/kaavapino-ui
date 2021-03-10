import React from 'react'
import { RadioButton } from 'hds-react'

const CustomRadioButton = ({
  input: { value, name, ...rest },
  meta: { error },
  options,
  inverted,
  ...custom
}) => {
  return (
    <div className={`radio-input-container${inverted ? ' inverted' : ''}`}>
      {options.map((option, i) => (
        <RadioButton
          key={i}
          label={option.label}
          {...custom}
          error={error}
          name={name}
          onChange={() => {
            rest.onChange(option.value)
          }}
          checked={value === option.value}
        ></RadioButton>
      ))}
    </div>
  )
}

export default CustomRadioButton
