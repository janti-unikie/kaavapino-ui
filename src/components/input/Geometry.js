import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Polygon from '../common/Polygon'
import { EPSG3879, formatGeoJSONToPositions, helsinkiCenter } from '../../utils/mapUtils'

function Geometry(props) {
  
  const crs = EPSG3879()

  const disabled = false

 const getCoordinates = () => {
    const value = props.input.value
      if ( !value ) {
        return []
      }
      const coordinates = value[0] && value[0].geometry && value[0].geometry.coordinates
      return coordinates || []
  }

  const getCenterCoordinates = () => {
    const coordinates = getCoordinates()
    
    if ( !coordinates || !coordinates[0] || !coordinates[0][0]) {
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
        zoom={7}
        minZoom={4}
        crs={crs}
        style={!disabled ? { cursor: 'pointer' } : {}}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://geoserver.hel.fi/mapproxy/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={formatGeoJSONToPositions( [getCoordinates()] )}
        />
      </Map> 
    </div>
  )
}

export default Geometry
