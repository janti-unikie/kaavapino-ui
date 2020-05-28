import React, { Component } from 'react'
import { fakeLogin } from '../../actions/authActions'
import { connect } from 'react-redux'

class FakeLoginPage extends Component {
  componentDidMount = () => this.props.fakeLogin()

  render = () => <p>Uudelleenohjataan...</p>
}

const mapDispatchToProps = {
  fakeLogin
}

export default connect(null, mapDispatchToProps)(FakeLoginPage)
