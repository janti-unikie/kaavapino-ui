import L from 'leaflet'
import 'proj4'
import 'proj4leaflet'

export const EPSG3879 = () => {
  const crsName = 'EPSG:3879'
  const projDef =
    '+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
  const bounds = L.bounds(L.point(-548576, 6291456), L.point(1548576, 8388608))
  const originNw = [bounds.min.x, bounds.max.y]
  const crsOpts = {
    resolutions: [
      8192,
      4096,
      2048,
      1024,
      512,
      256,
      128,
      64,
      32,
      16,
      8,
      4,
      2,
      1,
      0.5,
      0.25,
      0.125
    ],
    bounds,
    transformation: new L.Transformation(1, -originNw[0], -1, originNw[1])
  }
  return new L.Proj.CRS(crsName, projDef, crsOpts)
}

export const formatGeoJSONToPositions = geoJSON => {
  const result = []
  if (!geoJSON) {
    return [[]]
  }
  geoJSON.forEach(polygon => {
    if (polygon.length === 0) {
      result.push([])
    } else {
      result.push(polygon[0].slice(0, -1).map(([lat, lng]) => ({ lat, lng })))
    }
  })
  return result
}

export const formatPositionsToGeoJSON = positions => {
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
