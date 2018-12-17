
import React from 'react'
import { Loader, Popup } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Button = ({ handleClick, value, icon, loading, help }) => {
  const btn = (
    <button disabled={loading} className='form-button' onClick={handleClick}>
      { !loading && icon }
      { loading && <Loader inverted size='tiny' color='white' inline active /> }
      { ` ${value}` }
    </button>
  )
  return help ?
    <Popup trigger={btn} content={help} position='bottom center' /> :
    btn
}

Button.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string
}

export default Button