import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = ({ handleClick, value, check }) => {
  return (
    <button className='button' onClick={handleClick}>
      { check && <FontAwesomeIcon icon='check' /> }
      { check && '   ' }
      { value }
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string
}

export default Button