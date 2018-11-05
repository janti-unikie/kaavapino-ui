
import React from 'react'
import { Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, value, icon, loading }) => {
  return (
    <button disabled={loading} className='form-button' onClick={handleClick}>
      { !loading && icon }
      { loading && <Loader inverted size='tiny' color='white' inline active /> }
      { ` ${value}` }
    </button>
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string
}

export default Button