import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import projectUtils from '../../utils/projectUtils'

const Status = ({ phase }) => {
  const color = projectUtils.statusToColor(phase)
  return (
    <span
      className='project-status'
      style={{ backgroundColor: color, ...(color === 'white' && { border: '1px solid' }) }}
    />
  )
}

const DateItem = ({ value }) => <span>{ projectUtils.formatDate(value) }</span>

const ListItem = ({ item, getUsersName }) => {
  const { phase, name, id, type, modified_at, user } = item
  return (
    <div className='project-list-item'>
      <span className='project-list-item-name'><Status phase={phase} /> <Link className='project-name' to={`/project/${id}`}>{ name }</Link></span>
      <span>{ projectUtils.statusToText(phase) }</span>
      { 'TODO' }
      <span>{ projectUtils.projectSizeToText(type) }</span>
      <DateItem value={modified_at} />
      <span>{ getUsersName(user) }</span>
      { 'TODO' }
      <Link className='project-list-button' to={`/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
    </div>
  )
}

export default ListItem
