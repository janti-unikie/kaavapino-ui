import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ render: Component, pred, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      pred
        ? <Component {...props} />
        : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
    )} />
  )
}

ProtectedRoute.propTypes = {
  render: PropTypes.func,
  pred: PropTypes.bool
}

export default ProtectedRoute
