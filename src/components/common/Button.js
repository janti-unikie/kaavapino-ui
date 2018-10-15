import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, value, icon }) => {
  return (
    <button className='form-button' onClick={handleClick}>
      { icon }
      { icon && ' ' }
      { value }
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string
}

export default Button