import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ render: Component, pred, children, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      pred
        ? (Component && <Component {...props} />) || children.map((c, i) => React.cloneElement(c, { ...props, key: i }))
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