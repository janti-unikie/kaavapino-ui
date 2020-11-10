import React from 'react'
import { Radio } from 'semantic-ui-react'

const RadioBooleanButton = ({
  input: { value, name, ...rest },
  meta: { error },
  inverted,
  double,
  onRadioChange,
  ...custom
}) => {
  const handleOnChange = value => {
    rest.onChange(value)
    if (onRadioChange) {
      onRadioChange()
    }
  }
  console.log('radioCustom', custom)
  return (
    <div className={`radio-input-container${inverted ? ' inverted' : ''}`}>
      <Radio
        label="Kyllä"
        {...custom}
        error={error}
        name={name}
        onChange={() => handleOnChange(true)}
        checked={value === true}
      />
      <Radio
        label="Ei"
        {...custom}
        error={error}
        name={name}
        onChange={() => handleOnChange(false)}
        checked={value === false}
      />
      {!double && (
        <Radio
          label="Tieto puuttuu"
          {...custom}
          error={error}
          name={name}
          onChange={() => handleOnChange(null)}
          checked={value !== true && value !== false}
        />
      )}
    </div>
  )
}

export default RadioBooleanButton
