import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LogoutPage extends Component {
  componentDidMount() {
    this.props.handleLogout()
  }

  render() {
    return <p>Kirjaudutaan ulos...</p>
  }
}

LogoutPage.propTypes = {
  handleLogout: PropTypes.func
}

export default LogoutPage
