import React from 'react'
import { Polygon } from 'react-leaflet'

const CustomPolygon = ({ positions, children }) => {
  return (
    <Polygon  positions={positions} fillOpacity={0.4}>
      {children}
    </Polygon>
  )
}

export default CustomPolygon
