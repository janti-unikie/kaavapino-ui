import React from 'react'
import FloorAreaMobile from './FloorAreaMobile'
import CustomMap from './CustomMap'
import { Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import FloorAreaMeetings from './FloorAreaMeetingsMobile';


function MobileView({ isPrivileged }) {

  const {t} = useTranslation()  

  /*const [filter,  ] = useState()

  const onFilterChange = () => {

  }

  const onClear = () => {

  }*/

  return (
    <div>
      <div className="overview">
        <h3 className="mobile-header">{t('overview.title')}</h3>
        <Segment key="map">
          <CustomMap isPrivileged={isPrivileged} isMobile={true} />
        </Segment>
        <Segment key="floor-area">
          <FloorAreaMobile isPrivileged={isPrivileged} />
        </Segment>
        <Segment key="floor-area-meetings">
          <FloorAreaMeetings isPrivileged={isPrivileged} />
        </Segment>
      </div>
    </div>
  )
}

export default MobileView
