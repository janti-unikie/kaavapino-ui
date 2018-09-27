import React, { Component } from 'react'
import userManager from '../../utils/userManager'

class LoginPage extends Component {
  componentDidMount = () => this.handleLogin()

  handleLogin = () => userManager.signinRedirect()

  render = () => <p>Redirecting...</p>
}

export default LoginPage
