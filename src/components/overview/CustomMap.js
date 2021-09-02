import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import FilterList from './Filters/FilterList'
import { formatGeoJSONToPositions, helsinkiCenter } from '../../utils/mapUtils'
import {
  projectOverviewMapDataSelector,
  projectOverviewMapFiltersSelector
} from '../../selectors/projectSelector'
import { connect } from 'react-redux'

import {
  getProjectsOverviewMapData,
  clearProjectsOverviewMapData,
  setProjectsOverviewMapFilter
} from '../../actions/projectActions'
import { LoadingSpinner } from 'hds-react'
import { isEmpty, isEqual } from 'lodash'
import { EPSG3879 } from '../../utils/mapUtils'
import CustomMapPolygon from './CustomMapPolygon'

function CustomMap({
  filters,
  getProjectsOverviewMapData,
  mapData,
  clearProjectsOverviewMapData,
  setProjectsOverviewMapFilter,
  storedFilter,
  isPrivileged
}) {
  const crs = EPSG3879()

  const [currentMapData, setCurrentMapData] = useState(null)
  const [filter, setFilter] = useState({})

  useEffect(() => {
    getProjectsOverviewMapData(filter)
    setCurrentMapData(mapData)
  }, [])

  useEffect(() => {
    if (!storedFilter || !isEqual(storedFilter, filter)) {
      clearProjectsOverviewMapData()
      setCurrentMapData(null)
      getProjectsOverviewMapData(filter)
      setProjectsOverviewMapFilter(filter)
      setCurrentMapData(mapData)
    }
  }, [filter])

  useEffect(() => {
    setCurrentMapData(mapData)
  }, [mapData])

  const getCoordinates = geoserver_data => {
    if (!geoserver_data || !geoserver_data.suunnittelualueen_rajaus) {
      return null
    }
    if (!geoserver_data.suunnittelualueen_rajaus) {
      return null
    }
    return geoserver_data.suunnittelualueen_rajaus[0].geometry.coordinates
  }
  const currentCoordinates = []

  currentMapData &&
    currentMapData.projects &&
    currentMapData.projects.forEach(value => {
      const coordinates = getCoordinates(value.geoserver_data)
      coordinates &&
        currentCoordinates.push({
          project: value,
          color: value.phase_color,
          coordinates: [coordinates]
        })
    })

  const [current] = useState(helsinkiCenter)

  const onFilterChange = (values, currentParameter) => {
    if (!values || values.length === 0) {
      const newFilter = Object.assign({}, filter)
      delete newFilter[currentParameter]
      setFilter({
        ...newFilter
      })
      return
    }
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
  }
  const onClear = () => {
    setProjectsOverviewMapFilter({})
    setFilter({})
  }

  const { t } = useTranslation()

  const getPolygonArea = () => {
    return (
      currentCoordinates &&
      currentCoordinates.map((current, index) => {
        return (
          <div key={index}>
            <CustomMapPolygon
              project={current.project}
              color={current.color}
              key={index}
              positions={formatGeoJSONToPositions(current.coordinates)}
              isPrivileged={isPrivileged}
            />
          </div>
        )
      })
    )
  }

  return (
    <div className="map-area">
      <div className="geometry-input-container">
        <h3>{t('map-area.title')} </h3>
        {isEmpty(mapData) && (
          <span className="loading-info">
            <LoadingSpinner small={true} className="loader-icon header-spinner" />
            {t('map-area.loading-data')}
          </span>
        )}

        <FilterList
          currentFilter={filter}
          onChange={onFilterChange}
          filterList={filters}
          showClearButton={true}
          onClear={onClear}
        />
        <Map
          className="geometry-input"
          center={current}
          scrollWheelZoom={true}
          zoom={8}
          doubleClickZoom={true}
          crs={crs}
         >
          {getPolygonArea()}
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://geoserver.hel.fi/mapproxy/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    </div>
  )
}
const mapDispatchToProps = {
  getProjectsOverviewMapData,
  clearProjectsOverviewMapData,
  setProjectsOverviewMapFilter
}

const mapStateToProps = state => {
  return {
    mapData: projectOverviewMapDataSelector(state),
    storedFilter: projectOverviewMapFiltersSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomMap)