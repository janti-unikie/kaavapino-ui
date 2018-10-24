import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const CustomInput = ({ input, ...custom }) => <Input {...input} {...custom} fluid />

CustomInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default CustomInput