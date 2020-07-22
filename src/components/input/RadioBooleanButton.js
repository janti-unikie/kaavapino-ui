import React from 'react'
import { Radio } from 'semantic-ui-react'

const RadioBooleanButton = ({
  input: { value, name, ...rest },
  meta: { error },
  inverted,
  double,
  ...custom
}) => {
  return (
    <div className={`radio-input-container${inverted ? ' inverted' : ''}`}>
      <Radio
        label="Kyllä"
        {...custom}
        error={error}
        name={name}
        onChange={() => rest.onChange(true)}
        checked={value === true}
      />
      <Radio
        label="Ei"
        {...custom}
        error={error}
        name={name}
        onChange={() => rest.onChange(false)}
        checked={value === false}
      />
      {!double && (
        <Radio
          label="Tieto puuttuu"
          {...custom}
          error={error}
          name={name}
          onChange={() => rest.onChange(null)}
          checked={value !== true && value !== false}
        />
      )}
    </div>
  )
}

export default RadioBooleanButton
