import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutSuccessful } from '../../actions/authActions'

class LoginCallbackPage extends Component {
  componentDidMount = () => this.props.logoutSuccessful()

  render = () => <p>Uudelleenohjataan...</p>
}

LoginCallbackPage.propTypes = {
  logoutSuccessful: PropTypes.func
}

const mapDispatchToProps = {
  logoutSuccessful
}

export default connect(null, mapDispatchToProps)(LoginCallbackPage)
