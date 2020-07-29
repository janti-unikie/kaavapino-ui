import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditFloorAreaFormModal from '../project/EditFloorAreaFormModal'

class Overview extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    document.title = 'Kaavapino'
  }
  render() {
    return <h1>Yleisnäkymä</h1>
  }
}
export default connect(null)(Overview)
