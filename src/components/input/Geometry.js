import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import Polygon from '../common/Polygon'
import { Button } from 'semantic-ui-react'
import { EPSG3879 } from '../../utils/mapUtils'

class Geometry extends Component {
  constructor(props) {
    super(props)

    this.mapRef = React.createRef()

    this.state = {
      userActions: [],
      center: [60.192059, 24.945831]
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.input.value && this.props.input.value) {
      const newCenter = this.props.input.value.coordinates[0][0][0]
      if (!this.mapRef.current.leafletElement.getBounds().contains(newCenter)) {
        this.setState({ center: this.props.input.value.coordinates[0][0][0] })
      }
    }
  }

  handleUpdate = (positions) => {
    this.props.input.onChange(this.formatPositionsToGeoJSON(positions))
  }

  formatGeoJSONToPositions = (geoJSON) => {
    const result = []
    if (!geoJSON) {
      return [[]]
    }
    geoJSON.forEach((polygon) => {
      if (polygon.length === 0) {
        result.push([])
      } else {
        result.push(polygon[0].slice(0, -1).map(([lat, lng]) => ({ lat, lng })))
      }
    })
    return result
  }

  formatPositionsToGeoJSON = (positions) => {
    const result = []
    positions.forEach((polygon, i) => {
      result.push([])
      if (polygon.length > 0) {
        let updatedPolygon = polygon.concat(polygon[0])
        result[i].push(updatedPolygon.map(({ lat, lng }) => [lat, lng]))
      }
    })
    return {
      type: 'MultiPolygon',
      coordinates: result
    }
  }

  handleDoubleClick = ({ latlng }) => {
    const { userActions } = this.state
    const { coordinates } = this.props.input.value
    const positions = this.formatGeoJSONToPositions(coordinates)
    const newUserActions = userActions.concat([positions])
    const newPositions = [ ...positions ]
    newPositions[newPositions.length - 1] = newPositions[newPositions.length - 1].concat(latlng)
    this.setState({ userActions: newUserActions })
    this.handleUpdate(newPositions)
  }

  clear = () => this.handleUpdate([[]])

  addArea = () => {
    const { coordinates } = this.props.input.value
    const positions = this.formatGeoJSONToPositions(coordinates)
    const newPositions = positions.concat([[]])
    this.handleUpdate(newPositions)
  }

  revert = () => {
    const { userActions } = this.state
    if (userActions.length > 0) {
      const prevPositions = userActions.pop()
      this.handleUpdate(prevPositions)
    }
  }

  render() {
    const { coordinates } = this.props.input.value
    const crs = EPSG3879()
    return (
      <div className='geometry-input-container'>
        <Map
          className='geometry-input'
          center={this.state.center}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          maxZoom={16}
          zoom={13}
          crs={crs}
          ondblclick={this.handleDoubleClick}
          ref={this.mapRef}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://geoserver.hel.fi/mapproxy/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png'
          />
          <Polygon positions={this.formatGeoJSONToPositions(coordinates)} />
        </Map>
        <div className='geometry-input-actions'>
          <Button onClick={this.clear}>Tyhjennä</Button>
          <Button onClick={this.addArea}>Lisää uusi alue</Button>
          <Button onClick={this.revert}>Peruuta muutos</Button>
        </div>
      </div>
    )
  }
}

export default Geometry