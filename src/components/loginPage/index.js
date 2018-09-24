import React, { Component } from 'react'
import Button from '../common/Button'
import userManager from '../../utils/userManager'

class LoginPage extends Component {
  handleLogin = () => userManager.signinRedirect()

  render = () => <Button value={'LOGIN'} handleClick={this.handleLogin} />
}

export default LoginPage
