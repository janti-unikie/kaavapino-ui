import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Status = ({ color }) => {
  return (
    <span
      className='project-status'
      style={{ backgroundColor: color, ...(color === '#ffffff' && { border: '1px solid' }) }}
    />
  )
}

const ListItem = ({ item: { phaseName, phaseColor, name, id, subtype, modified_at, user, projectId, nextDeadline } }) => {
  return (
    <div className='project-list-item'>
      <span>{ projectId }</span>
      <span className='project-list-item-name'><Link className='project-name' to={`/${id}`}>{ name }</Link></span>
      <span className='project-list-item-phase'><Status color={phaseColor} /> { phaseName }</span>
      <span>{ nextDeadline }</span>
      <span>{ subtype }</span>
      <span>{ modified_at }</span>
      <span>{ user }</span>
      <Link className='project-list-button' to={`/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
    </div>
  )
}

export default ListItem
