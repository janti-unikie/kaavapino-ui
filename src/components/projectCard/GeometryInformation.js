import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { useTranslation } from 'react-i18next'

import {
    EPSG3879
  } from '../../utils/mapUtils'

const defaultPosition = [60.192059, 24.945831]

function GeometryInformation({ field }) {
  const crs = EPSG3879()
  //
  const value = field && field.value ? field.value : defaultPosition

  const { t } = useTranslation()

  return (
    <div>
    <h3>{t('project.planning-area-constraints')}</h3>
      <div className="geometry-input-container">
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
  export default GeometryInformation