import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as ProjectEditIcon } from '../../assets//icons/edit-project.svg'
import Graph from '../common/Graph'
import { Popup } from 'semantic-ui-react'

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
        <span className="project-list-item-name field-ellipsis">
            <Popup
              trigger={(<Link className="project-name" to={`/${id}`}>{name}</Link>)}
              on="hover"
              content={name}
            />
        </span>
        <span className="project-list-item-phase field-ellipsis">
          <Status color={phaseColor} /> {phaseName}
        </span>
        <span>{subtype}</span>
        <span>{modified_at}</span>
          <Popup
            trigger={<span className="field-ellipsis">{user}</span>}
            on="hover"
            content={user}
          />
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
