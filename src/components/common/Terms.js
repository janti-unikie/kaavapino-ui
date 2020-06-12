import React, { Component } from 'react'
import { connect } from 'react-redux'

class Terms extends Component {
  constructor( props ) {
    super( props )

    this.state = {

    }
  }

  componentDidMount() {
    document.title = 'Kaavapino'
  }
  render() {
    return (
      <h1>Sivuston käyttöehdot</h1>
    )
  }
}
export default connect(
  null
)(Terms)