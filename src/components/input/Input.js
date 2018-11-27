import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import inputUtils from '../../utils/inputUtils'

const CustomInput = ({ input: { onChange, ...rest }, meta: { error }, ...custom }) => (
  <Input
    error={inputUtils.hasError(error)}
    onChange={(e) => onChange(e.target.value)}
    {...rest}
    {...custom}
    fluid
  />
)

CustomInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default CustomInput