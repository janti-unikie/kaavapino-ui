export const OVERALL = 'kerrosalan_lisays_yhteensa_asuminen'
export const PUBLIC = 'kerrosalan_lisays_yhteensa_julkinen'
export const OTHER = 'kerrosalan_lisays_yhteensa_muut'
export const BUSINESS_PREMISES = 'kerrosalan_lisays_yhteensa_toimitila'
export const PREDICTION = '_prediction'
export const FLOOR_AREAS = 'floorAreas'
export const MEETINGS = 'meetings'
export const DATE = 'date'

export const getFloorAreaChartData = data => {
  const modifiedData = {}

  if (!data || !data.daily_stats) {
    return null
  }

  modifiedData['currentDate'] = data.date

  const floorAreas = []

  data.daily_stats.forEach(current => {
    const chartData = {}

    if ( !current || !current.floor_area ) {
      return null
    }
    const isPrediction = current.floor_area.is_prediction

    const overallData = current.floor_area[OVERALL] ? current.floor_area[OVERALL] : 0
    const publicData = current.floor_area[PUBLIC] ? current.floor_area[PUBLIC] : 0
    const otherData = current.floor_area[OTHER] ? current.floor_area[OTHER] : 0
    const businessPremisesData = current.floor_area[BUSINESS_PREMISES]
      ? current.floor_area[BUSINESS_PREMISES]
      : 0

    const date = new Date(current[DATE]).getTime()

    const meetings = current[MEETINGS]

    if (isPrediction) {
      chartData[OVERALL] = 0
      chartData[PUBLIC] = 0
      chartData[OTHER] = 0
      chartData[BUSINESS_PREMISES] = 0

      chartData[OVERALL + PREDICTION] = overallData
      chartData[PUBLIC + PREDICTION] = publicData
      chartData[OTHER + PREDICTION] = otherData
      chartData[BUSINESS_PREMISES + PREDICTION] = businessPremisesData
    } else {
      chartData[OVERALL] = overallData
      chartData[PUBLIC] = publicData
      chartData[OTHER] = otherData
      chartData[BUSINESS_PREMISES] = businessPremisesData

      chartData[OVERALL + PREDICTION] = 0
      chartData[PUBLIC + PREDICTION] = 0
      chartData[OTHER + PREDICTION] = 0
      chartData[BUSINESS_PREMISES + PREDICTION] = 0
    }
    chartData[MEETINGS] = meetings
    chartData[DATE] = date

    floorAreas.push( chartData )
  })

  modifiedData[FLOOR_AREAS] = floorAreas

  return modifiedData
}
