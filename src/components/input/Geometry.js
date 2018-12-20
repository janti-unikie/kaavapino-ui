import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { EPSG3879 } from '../../utils/mapUtils'

class Geometry extends Component {
  constructor(props) {
    super(props)

    this.position = [60.192059, 24.945831]
  }

  render() {
    const crs = EPSG3879()
    return (
      <Map className='geometry-input' center={this.position} doubleClickZoom={false} scrollWheelZoom={false} maxZoom={16} zoom={10} crs={crs}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://geoserver.hel.fi/mapproxy/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png'
        />
      </Map>
    )
  }
}

export default Geometry