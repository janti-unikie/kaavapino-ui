import React, { useState } from 'react'
import PropTypes from 'prop-types'
import inputUtils from '../../utils/inputUtils'
import { useTranslation } from 'react-i18next'
import { TextInput, IconAlertCircle } from 'hds-react'

const DeadLineInput = ({
  input,
  meta: { error },
  currentDeadline,
  editable,
  type,
  disabled,
  placeholder,
  className
}) => {
  const { t } = useTranslation()

  let currentError
  const generated = currentDeadline && currentDeadline.generated

  const [currentValue, setCurrentValue] = useState(
    currentDeadline ? currentDeadline.date : input.value
  )

  const [valueGenerated, setValueGenerated] = useState(generated)

  if (currentDeadline && currentDeadline.is_under_min_distance_previous) {
    currentError = t('messages.min-distance')

    if (
      currentDeadline.deadline &&
      currentDeadline.deadline.error_min_distance_previous
    ) {
      currentError = currentDeadline.deadline.error_min_distance_previous
    }
  }
  if (currentDeadline && currentDeadline.is_under_min_distance_next) {
    currentError = t('messages.max-distance')

    if (currentDeadline.deadline && currentDeadline.warning_min_distance_next) {
      currentError = currentDeadline.warning_min_distance_next
    }
  }

  let currentClassName =
    generated && valueGenerated && editable
      ? `${className} deadline-estimated`
      : className

  const hasError =
    editable && (inputUtils.hasError(error) || inputUtils.hasError(currentError))
  if (hasError) {
    currentClassName = `${currentClassName} error-border`
  }

  return (
    <div>
      <TextInput
        value={currentValue}
        name={input.name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={event => {
          const value = event.target.value
          setCurrentValue(value)
          input.onChange(value)
        }}
        className={currentClassName}
        onBlur={() => {
          if (input.value !== input.defaultValue) {
            setValueGenerated(false)
          } else {
            setValueGenerated(true)
          }
        }}
      />
      {editable && valueGenerated ? (
        <span className="deadline-estimated">{t('deadlines.estimated')}</span>
      ) : (
        ''
      )}
      {editable && hasError && (
        <div className="error-text">
          <IconAlertCircle size="xs" /> {currentError}{' '}
        </div>
      )}
    </div>
  )
}

DeadLineInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default DeadLineInput
