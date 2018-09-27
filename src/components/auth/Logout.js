import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LogoutPage extends Component {
  componentDidMount() {
    this.props.handleLogout()
  }

  render() {
    return <p>logging out...</p>
  }
}

LogoutPage.propTypes = {
  handleLogout: PropTypes.func
}

export default LogoutPage