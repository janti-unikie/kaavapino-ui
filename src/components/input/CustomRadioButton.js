import React, { useState } from 'react'
import { Checkbox } from 'hds-react'

const RadioButton = ({
  input: { value, name, ...rest },
  meta: { error },
  options
}) => {

  console.log( options )
  const [checked, setChecked] = useState(value)
  return (
    <span className="checkbox">
      {options.map((option, i) => (
        <Checkbox
          key={i}
          id={i}
          label={option.label}
          error={error}
          name={name}
          onChange={() => {
            rest.onChange(option.value)
            setChecked(option.value)
          }}
          checked={option.value === checked}
          className="checkbox-item"
        ></Checkbox>
      ))}
    </span>
  )
}

export default RadioButton
