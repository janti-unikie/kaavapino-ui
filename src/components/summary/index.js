import React, { Component } from 'react'
import ProjectImage from './ProjectImage'
import ProjectInfo from './ProjectInfo'

class Summary extends Component {
  render = () => {
    return (
      <div className='project-summary-container'>
        <ProjectInfo />
        <ProjectImage />
      </div>
    )
  }
}

export default Summary