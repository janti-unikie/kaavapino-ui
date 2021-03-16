import React from 'react'
import { Radio } from 'semantic-ui-react'

const RadioButton = ({
  input: { value, name, ...rest },
  meta: { error },
  options,
  inverted,
  ...custom
}) => (
  <div className={`radio-input-container${inverted ? ' inverted' : ''}`}>
    {options.map((option, i) => (
      <Radio
        key={i}
        label={option.label}
        {...custom}
        error={error}
        name={name}
        onChange={() => {
          rest.onChange(option.value)
        }}
        checked={value === option.value}
      ></Radio>
    ))}
  </div>
)

export default RadioButton
