import React, { useState } from 'react'
import { RadioButton } from 'hds-react'

const RadioBooleanButton = ({
  input: { value, name, ...rest },
  meta: { error },
  double,
  onRadioChange,
  disabled,
  className
}) => {
  const [radioValue, setRadioValue] = useState(value)

  const handleOnChange = value => {
    setRadioValue(value)
    rest.onChange(value)
    if (onRadioChange) {
      onRadioChange()
    }
  }

  return (
    <div>
      <RadioButton
        key={`${name}-true`}
        id={`${name}-true`}
        label="Kyllä"
        disabled={disabled}
        className={`radio-button radio-button-true ${className}`}
        value="Kyllä"
        error={error}
        name={name}
        onChange={() => handleOnChange(true)}
        checked={radioValue === true}
      />
      <RadioButton
        label="Ei"
        id={`${name}-false`}
        key={`${name}-false`}
        disabled={disabled}
        className={`radio-button radio-button-false ${className}`}
        error={error}
        value="Ei"
        name={name}
        onChange={() => handleOnChange(false)}
        checked={radioValue === false}
      />
      {!double && (
        <RadioButton
          key={`${name}-null`}
          id={`${name}-null`}
          label="Tieto puuttuu"
          disabled={disabled}
          className={`radio-button radio-button-null ${className}`}
          value=""
          error={error}
          name={name}
          onChange={() => handleOnChange(null)}
          checked={radioValue !== false && radioValue !== true}
        />
      )}
    </div>
  )
}

export default RadioBooleanButton
