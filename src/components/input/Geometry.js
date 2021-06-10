import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Polygon from '../common/Polygon'
import { EPSG3879, formatGeoJSONToPositions, helsinkiCenter } from '../../utils/mapUtils'

function Geometry(props) {
  const crs = EPSG3879()

  const disabled = false

  const getCoordinates = () => {
    const value = props.input.value
    if (!value) {
      if (props.value) {
        return props.value.coordinates
      }
      return {}
    }
    const coordinates = value[0] && value[0].geometry && value[0].geometry.coordinates
    return coordinates || {}
  }

  const getCenterCoordinates = () => {
    const coordinates = getCoordinates()

    if (!coordinates || !coordinates[0] || !coordinates[0][0]) {
      return helsinkiCenter
    }
    return coordinates[0][0]
  }

  return (
    <div className="geometry-input-container">
      <Map
        className={`geometry-input${disabled ? ' disabled' : ''}`}
        center={getCenterCoordinates()}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        maxZoom={18}
        zoomControl={!disabled}
        dragging={!disabled}
        crs={crs}
        style={!disabled ? { cursor: 'pointer' } : {}}
        zoom={9}
        minZoom={9}
        clusterPopupVisibility={11}
        unitZoom={12}
        mobileZoom={9}
        detailZoom={14}
        mapBounds={[
          [60.402200415095926, 25.271114398151653],
          [60.402200415095926, 24.49246149510767],
          [60.00855312110063, 24.49246149510767],
          [60.00855312110063, 25.271114398151653]
        ]}
      >
        <TileLayer url="https://kartta.hel.fi/ws/geoserver/avoindata/gwc/service/wmts?layer=avoindata:Karttasarja_PKS&tilematrixset=ETRS-GK25&Service=WMTS&Request=GetTile&Version=1.0.0&TileMatrix=ETRS-GK25:{z}&TileCol={x}&TileRow={y}&Format=image%2Fpng" />
        <Polygon positions={formatGeoJSONToPositions([getCoordinates()])} />
      </Map>
    </div>
  )
}

export default Geometry
