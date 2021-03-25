import React from 'react'
import { Link } from 'react-router-dom'
import { Popup } from 'semantic-ui-react'
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline'
import { IconPenLine, Button } from 'hds-react'

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
  showGraph,
  isUserPrivileged,
  modifyProject,
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
        <span className="project-list-item-pino field-ellipsis center">
          {pino_number}
        </span>
        <span className="center field-ellipsis" >{projectId}</span>
        <span className="project-list-item-name center field-ellipsis">
          <Popup
            trigger={(
              <Link className="project-name" to={`/${id}`}>
                {name}
              </Link>
            )}
            on="hover"
            content={name}
          />
        </span>
        <span className="project-list-item-phase center field-ellipsis">
          <Status color={phaseColor} /> {phaseName}
        </span>
        <span className="center field-ellipsis">{subtype}</span>
        <span className="center field-ellipsis">{modified_at}</span>
        <Popup
          trigger={<span className="field-ellipsis center">{user}</span>}
          on="hover"
          content={user}
        />
        <span className="project-list-button">
        {isUserPrivileged && (
          <Button
            aria-label="Muokkaa"
            className="project-list-button"
            value="modify"
            variant="supplementary"
            iconLeft={<IconPenLine />}
            onClick={() => modifyProject(id)}
          />
        )}
        </span>
      </div>
      <div className="project-list-item-graph">
        {showGraph && <ProjectTimeline id={id} />}
      </div>
    </div>
  )
}

export default ListItem
