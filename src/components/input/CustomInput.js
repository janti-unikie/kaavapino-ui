import React from 'react'
import PropTypes from 'prop-types'
import inputUtils from '../../utils/inputUtils'
import { TextInput } from 'hds-react'

const CustomInput = ({ input, meta: { error }, ...custom }) => {

  return <TextInput aria-label={input.name} error={inputUtils.hasError(error).toString()} {...input} {...custom} fluid='true' />
}

CustomInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default CustomInput
