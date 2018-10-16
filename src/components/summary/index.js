import React, { Component } from 'react'
import ProjectImage from './ProjectImage'
import ProjectInfo from './ProjectInfo'

class Summary extends Component {
  render = () => {
    const { project } = this.props
    return (
      <div className='project-summary-container'>
        <ProjectInfo project={project} />
        <ProjectImage src={project.image} />
      </div>
    )
  }
}

export default Summary