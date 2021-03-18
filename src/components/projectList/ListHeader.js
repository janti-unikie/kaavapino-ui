import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'semantic-ui-react'
import SearchBar from '../SearchBar'
import { IconAngleUp, IconAngleDown } from 'hds-react'

const ListHeader = ({
  items,
  sort,
  selected,
  dir,
  toggleGraph,
  toggleSearch,
  searchOpen,
  graphToggled,
  buttonAction
}) => {
  const getArrowIcon = () => {
    return dir === 0 ? <IconAngleUp display='none' size='s' /> : <IconAngleDown size='s'/>
  }
  return (
    <div className="project-list-wrapper">
      <p className="project-list-sort-text">Lajittele</p>
      <div className="project-list-header">
        {items.map((item, index) => {
          return (
            <span className="header-item" key={index} onClick={() => sort(index)}>
              {item}
              <span className="header-sort-icon">
                {selected === index && getArrowIcon()}
              </span>
            </span>
          )
        })}
        <span className="header-item project-timeline-toggle">
          Aikajana
          <Radio onChange={() => toggleGraph()} toggle checked={graphToggled} />
        </span>
      </div>
      <div className="project-list-mb-actions">
        <span className="project-timeline-toggle-mb">
          <Radio
            onChange={() => toggleGraph()}
            toggle
            checked={graphToggled}
            label="Näytä aikajanat"
          />
        </span>
        <SearchBar
          toggleSearch={toggleSearch}
          searchOpen={searchOpen}
          buttonAction={buttonAction}
        />
      </div>
    </div>
  )
}

ListHeader.propTypes = {
  toggleSearch: PropTypes.func,
  searchOpen: PropTypes.bool,
  toggleGraph: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  sort: PropTypes.func.isRequired,
  dir: PropTypes.number.isRequired
}

export default ListHeader
