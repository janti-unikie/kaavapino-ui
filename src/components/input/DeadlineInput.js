import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'
import { useTranslation } from 'react-i18next'

const DeadLineInput = ({ input, meta: { error }, currentDeadline, ...custom }) => {
  const { t } = useTranslation()

  const generated = currentDeadline && currentDeadline.generated

  const [valueGenerated, setValueGenerated ] = useState(generated)

  let currentError = error

  if (currentDeadline && currentDeadline.is_under_min_distance_previous) {
    currentError = t('messages.min-distance')
  }
  if (currentDeadline && currentDeadline.is_under_min_distance_next) {
    currentError = t('messages.max-distance')
  }

  return (
    <div>
      <Input
        error={inputUtils.hasError(currentError)}
        {...input}
        {...custom}
        className={generated && valueGenerated ? `${custom.className} deadline-estimated` : custom.className}
        onBlur={ () => {
          setValueGenerated(false)
          }}
        fluid
      />
      {valueGenerated ? (
        <span className="deadline-estimated">{t('deadlines.estimated')}</span>
      ) : (
        ''
      )}
      {currentError && <div className="error-text">{currentError} </div>}
    </div>
  )
}

DeadLineInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default DeadLineInput
