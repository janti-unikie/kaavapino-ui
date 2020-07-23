import React from 'react'
import { Loader, Popup, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const FormButton = ({ handleClick, value, icon, loading, help, ...rest }) => {
  const btn = (
    <Button disabled={loading} className="form-button" onClick={handleClick} {...rest}>
      {!loading && icon}
      {loading && <Loader inverted size="tiny" color="white" inline active />}
      {` ${value}`}
    </Button>
  )
  return help ? (
    <Popup trigger={btn} content={help} hideOnScroll position="bottom center" />
  ) : (
    btn
  )
}

FormButton.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string
}

export default FormButton
