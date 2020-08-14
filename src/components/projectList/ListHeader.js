import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Radio } from 'semantic-ui-react'

const getArrowIcon = (dir) => (dir === 0 ? 'dir-up' : 'dir-down')

const ListHeader = ({ items, sort, selected, dir, toggleGraph }) => {
  return (
    <div className="project-list-header">
      {items.map((item, i) => (
        <span className="header-item" key={i} onClick={() => sort(i)}>
          {item}
          <FontAwesomeIcon
            className={`angle-icon angle-up-icon ${selected === i && getArrowIcon(dir)}`}
            icon="angle-up"
          />
          <FontAwesomeIcon
            className={`angle-icon angle-down-icon ${
              selected === i && getArrowIcon(dir)
            }`}
            icon="angle-down"
          />
        </span>
      ))}
      <span className="header-item project-timeline-toggle">
        Aikajana
        <Radio onChange={() => toggleGraph()} toggle />
      </span>
    </div>
  )
}

ListHeader.propTypes = {
  toggleGraph: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
  dir: PropTypes.number.isRequired
}

export default ListHeader
