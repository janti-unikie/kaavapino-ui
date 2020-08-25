import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ProjectEditIcon } from '../../assets//icons/edit-project.svg'
import Graph from '../common/Graph'

const Status = ({ color }) => {
  return (
    <span
      className="project-status"
      style={{
        backgroundColor: color,
        ...(color === '#ffffff' && { border: '1px solid' })
      }}
    />
  )
}

const ListItem = ({
  graphData,
  showGraph,
  item: {
    phaseName,
    phaseColor,
    name,
    id,
    subtype,
    modified_at,
    user,
    projectId,
    pino_number
  }
}) => {
  return (
    <div className="project-list-item-container">
      <div className="project-list-item">
        <span className="project-list-item-pino">{pino_number}</span>
        <span>{projectId}</span>
        <span className="project-list-item-name">
          <Link className="project-name" to={`/${id}`}>
            {name}
          </Link>
        </span>
        <span className="project-list-item-phase">
          <Status color={phaseColor} /> {phaseName}
        </span>
        <span>{subtype}</span>
        <span>{modified_at}</span>
        <span>{user}</span>
        <Link className="project-list-button" to={`/${id}/edit`}>
          <ProjectEditIcon />
        </Link>
      </div>
      <div className="project-list-item-graph">
        {showGraph && (
          <Graph data={[graphData]} height={Math.max(graphData.length * 65, 2 * 65)} />
        )}
      </div>
      <Link to={`/${id}`} className="project-card-mb">
        Projektikortti, {name}
      </Link>
    </div>
  )
}

export default ListItem
