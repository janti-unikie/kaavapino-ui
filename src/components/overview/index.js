import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline'

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
        <ProjectTimeline/>
        <h1>Yleisnäkymä</h1>
      </div>
    )
  }
}
export default connect(null)(Overview)
