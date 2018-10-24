import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'semantic-ui-react'

const getArrowIcon = (dir) => dir === 0 ? <FontAwesomeIcon icon='angle-up'/> : <FontAwesomeIcon icon='angle-down'/>

const ListHeader = ({ items, filter, sort, selected, dir }) => {
  return (
    <div className='project-list-header'>
      { items.map((item, i) => <span className='header-item' key={i} onClick={() => sort(i)}>{ item } { selected === i && getArrowIcon(dir) }</span>) }
      <Input onChange={(e) => filter(e.target.value)} icon='search' type='text' fluid placeholder='Haku' />
    </div>
  )
}

ListHeader.propTypes = {
  items: PropTypes.array.isRequired,
  filter: PropTypes.func.isRequired,
  sort: PropTypes.func.isRequired,
  dir: PropTypes.number.isRequired
}

export default ListHeader