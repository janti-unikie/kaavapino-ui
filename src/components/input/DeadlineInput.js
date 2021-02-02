import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'
import { useTranslation } from 'react-i18next'

const DeadLineInput = ({ input, meta: { error }, currentDeadline, ...custom }) => {
  const { t } = useTranslation()

  let currentError

  if (currentDeadline && currentDeadline.is_under_min_distance_previous) {
    currentError = t('messages.min-distance')
  }
  if (currentDeadline && currentDeadline.is_under_min_distance_next) {
    currentError = t('messages.max-distance')
  }

  const hasError = inputUtils.hasError(error) || inputUtils.hasError(currentError)

  return (
    <div>
      <Input error={hasError} {...input} {...custom} fluid />
      {currentError && <div className="error-text">{currentError} </div>}
    </div>
  )
}

DeadLineInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default DeadLineInput
