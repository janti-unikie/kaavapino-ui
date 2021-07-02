import React, {useState} from 'react'
import FloorAreaMobile from './FloorAreaMobile'
import CustomMap from './CustomMap'
import { Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import FilterList from './Filters/FilterList'


function MobileView({ isPrivileged, filters }) {

  const {t} = useTranslation()  

  const [filter,  ] = useState()

  const onFilterChange = () => {

  }

  const onClear = () => {

  }

  return (
    <div>
      <div className="overview">
        <h3 className="mobile-header">{t('overview.title')}</h3>
        <FilterList
          currentFilter={filter}
          onChange={onFilterChange}
          filterList={filters}
          showClearButton={true}
          onClear={onClear}
        />
        <Segment key="map">
          <CustomMap isPrivileged={isPrivileged} isMobile={true} />
        </Segment>
        <Segment key="floor-area">
          <FloorAreaMobile isPrivileged={isPrivileged} />
        </Segment>
      </div>
    </div>
  )
}

export default MobileView
