import React, { Component } from 'react'
import ProjectImage from './ProjectImage'
import ProjectInfo from './ProjectInfo'
import Graph from '../common/Graph'

const mockProjectGraphData = { title: 'Vallilanlaakson raitiotie', phases: [ new Date(2017, 10, 1), new Date(2018, 6, 1), new Date(2018, 11, 1), new Date(2019, 2, 1), new Date(2019, 3, 1), new Date(2019, 5, 1), new Date(2019, 8, 1) ] }

class Summary extends Component {
  render = () => {
    const { project } = this.props
    const data = [
      { ...mockProjectGraphData, title: project.name }
    ]
    return (
      <div>
        <div className='project-summary-container'>
          <ProjectInfo project={project} />
          <ProjectImage src={project.image} />
        </div>
        <div className='project-summary-graph-container'>
          <Graph data={data} height={'150px'} />
        </div>
      </div>
    )
  }
}

export default Summary