import React, { useState } from 'react'
import FloorAreaMobile from './FloorAreaMobile'
import CustomMap from './CustomMap'
import { Segment } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import FloorAreaMeetings from './FloorAreaMeetingsMobile'
import { Button } from 'hds-react'
import FilterModal from './Filters/FilterModal'
import { isArray } from 'lodash'

function MobileView({ isPrivileged, filters }) {
  const { t } = useTranslation()

  const [filter, setFilter] = useState()

  const [showFilterModal, setShowFilterModal] = useState(false)

  const onFilterChange = (values, currentParameter) => {
    if (!values || values.length === 0) {
      const newFilter = Object.assign({}, filter)
      delete newFilter[currentParameter]
      setFilter({
        ...newFilter
      })
      return
    }
    if (isArray(values)) {
      const valueArray = []
      let parameter

      values.forEach(value => {
        valueArray.push(value.value)
        parameter = value.parameter
      })

      setFilter({
        ...filter,
        [parameter]: valueArray
      })
    } else {
      setFilter({
        ...filter,
        [values.parameter]: values.value
      })
    }
  }

  return (
    <div>
      <FilterModal
        open={showFilterModal}
        initialValues={{}}
        filters={filters}
        handleClose={value => {
          setShowFilterModal(false)
          onFilterChange(value)
        }}
      />
      <div className="overview">
        <h3 className="mobile-header">{t('overview.title')}</h3>
        <Button
          className="overview-filter-button"
          variant="secondary"
          onClick={() =>
            showFilterModal ? setShowFilterModal(false) : setShowFilterModal(true)
          }
        >
          Filters
        </Button>
        <Segment key="map">
          <CustomMap isPrivileged={isPrivileged} isMobile={true} filter={filter} />
        </Segment>
        <Segment key="floor-area">
          <FloorAreaMobile isPrivileged={isPrivileged} filter={filter} />
        </Segment>
        <Segment key="floor-area-meetings">
          <FloorAreaMeetings isPrivileged={isPrivileged} filter={filter} />
        </Segment>
      </div>
    </div>
  )
}

export default MobileView
