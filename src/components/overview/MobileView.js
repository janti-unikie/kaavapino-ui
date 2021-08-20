import React, {useState} from 'react'
import FloorAreaMobile from './FloorAreaMobile'
import CustomMap from './CustomMap'
import { Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import FloorAreaMeetings from './FloorAreaMeetingsMobile';
import {Button} from 'hds-react'
import FilterModal from './Filters/FilterModal'



function MobileView({ isPrivileged }) {

  const {t} = useTranslation()  

  const [filter,  ] = useState()

  const [showFilterModal, setShowFilterModal ] = useState(false)

  return (
    <div>
     <FilterModal
          open={showFilterModal}
          initialValues={{}}
          handleClose={() => setShowFilterModal(false)}
        />
      <div className="overview">
        <h3 className="mobile-header">{t('overview.title')}</h3>
        <Button className="overview-filter-button" variant="secondary" onClick={() => showFilterModal ? setShowFilterModal( false ) : setShowFilterModal( true )} >Filters</Button>
        <Segment key="map">
          <CustomMap isPrivileged={isPrivileged} isMobile={true} filter={filter} />
        </Segment>
        <Segment key="floor-area">
          <FloorAreaMobile isPrivileged={isPrivileged} filter={filter}  />
        </Segment>
        <Segment key="floor-area-meetings">
          <FloorAreaMeetings isPrivileged={isPrivileged} filter={filter}  />
        </Segment>
      </div>
    </div>
  )
}

export default MobileView
