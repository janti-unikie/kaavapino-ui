import React from 'react'
import { Polygon } from 'react-leaflet'

const CustomPolygon = ({ positions, children, ...rest }) => {
  return (
    <Polygon positions={positions} fillOpacity={0.3} {...rest}>
      { children }
    </Polygon>
  )
}

export default CustomPolygon