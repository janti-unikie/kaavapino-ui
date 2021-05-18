import React from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Polygon from '../common/Polygon'
import { EPSG3879, formatGeoJSONToPositions, helsinkiCenter  } from '../../utils/mapUtils'

function Geometry(props) {

  const crs = EPSG3879()

  const disabled = false

  return (
    <div className="geometry-input-container">
      <Map
        className={`geometry-input${disabled ? ' disabled' : ''}`}
        center={helsinkiCenter}
        doubleClickZoom={false}
        scrollWheelZoom={false}
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
        <Polygon positions={formatGeoJSONToPositions(props.input && props.input.coordinates)} />
      </Map>
    </div>
  )
}

export default Geometry
