import React, { Component } from 'react'
import userManager from '../../utils/userManager'

class LoginPage extends Component {
  componentDidMount = () => {
    this.handleLogin()
    this.interval = setInterval(() => this.handleLogin(), 5000)
  }

  handleLogin = () => userManager.signinRedirect()

  componentWillUnmount = () => clearInterval(this.interval)

  render = () => <p>Redirecting...</p>
}

export default LoginPage
