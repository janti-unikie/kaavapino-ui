import React, { useState } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import FilterList from './Filters/FilterList'

import { EPSG3879 } from '../../utils/mapUtils'

const defaultPosition = [60.192059, 24.945831]

function CustomMap({ data, filters }) {
  const crs = EPSG3879()

  const [filter, setFilter] = useState({})

  const onFilterChange = (value, name) => {
    setFilter({
      ...filter,
      [name]: value
    })
  }
  const onClear = () => {
    setFilter({})
  }

  const value = data && data.value ? data.value : defaultPosition

  const { t } = useTranslation()

  return (
    <div className="map-area">
      <div className="geometry-input-container">
        <h3>{t('map-area.title')}</h3>
        <FilterList
          currentFilter={filter}
          onChange={onFilterChange}
          filterList={filters}
          showClearButton={true}
          onClear={onClear}
        />
        <Map
          className="geometry-input"
          center={value}
          scrollWheelZoom={false}
          zoom={12}
          doubleClickZoom={false}
          crs={crs}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://geoserver.hel.fi/mapproxy/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    </div>
  )
}
export default CustomMap
