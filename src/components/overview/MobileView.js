import React, { useState, useEffect } from 'react'
import FloorAreaMobile from './FloorAreaMobile'
import { Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import FloorAreaMeetings from './FloorAreaMeetingsMobile'
import { Button } from 'hds-react'
import FilterModal from './Filters/FilterModal'
import CustomMapMobile from './CustomMapMobile'
import { connect } from 'react-redux'
import {
  getProjectsOverviewMapData,
  getProjectsOverviewFloorArea
} from '../../actions/projectActions'

function MobileView({
  isPrivileged,
  filterList,
  getProjectsOverviewMapData,
  getProjectsOverviewFloorArea
}) {
  const { t } = useTranslation()

  const [filter, setFilter] = useState({})

  const [showFilterModal, setShowFilterModal] = useState(false)

  const onFilterSet = value => {
    setFilter(value)
  }

  useEffect(() => {
    getProjectsOverviewMapData(filter)
    getProjectsOverviewFloorArea(filter)
  }, [filter])

  useEffect(() => {
    return () => {
      setFilter({})
    }
  }, [])

  return (
    <div>
      <FilterModal
        open={showFilterModal}
        filterList={filterList}
        setFilter={onFilterSet}
        currentFilter={filter}
        handleClose={() => {
          setShowFilterModal(false)
        }}
      />
      <div className="overview">
        <h3 className="mobile-header">{t('overview.title')}</h3>
        <Button
          className="overview-filter-button"
          variant="secondary"
          onClick={() => {
            showFilterModal ? setShowFilterModal(false) : setShowFilterModal(true)
          }}
        >
          Filters
        </Button>
        <Button
          className="overview-filter-button"
          variant="secondary"
          onClick={() => {
            setFilter({})
          }}
        >
          Tyhjennä
        </Button>
        <Segment key="map">
          <CustomMapMobile isPrivileged={isPrivileged} />
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

const mapDispatchToProps = {
  getProjectsOverviewMapData,
  getProjectsOverviewFloorArea
}

export default connect(null, mapDispatchToProps)(MobileView)
