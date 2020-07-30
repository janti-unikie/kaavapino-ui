import React, { Component } from 'react'
import { connect } from 'react-redux'

class Overview extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    document.title = 'Kaavapino'
  }
  render() {
    return (
      <div>
        <h1>Yleisnäkymä</h1>
      </div>
    )
  }
}
export default connect(null)(Overview)
