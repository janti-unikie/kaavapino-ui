export const LIVING = 'kerrosalan_lisays_yhteensa_asuminen'
export const PUBLIC = 'kerrosalan_lisays_yhteensa_julkinen'
export const OTHER = 'kerrosalan_lisays_yhteensa_muut'
export const BUSINESS_PREMISES = 'kerrosalan_lisays_yhteensa_toimitila'
export const PREDICTION = '_prediction'
export const FLOOR_AREAS = 'floorAreas'
export const MEETINGS = 'meetings'
export const DATE = 'date'
export const LIVING_OVERALL ='living_overall'
export const TOTAL = 'total'

export const getFloorAreaChartData = data => {
  const modifiedData = {}

  if (!data || !data.daily_stats) {
    return null
  }

  modifiedData['currentDate'] = data.date

  const floorAreas = []

  data.daily_stats.forEach( current => {
    const chartData = {}

    if ( !current || !current.floor_area ) {
      return null
    }
    const isPrediction = current.floor_area.is_prediction

    const livingData = current.floor_area[LIVING] ? current.floor_area[LIVING] : 0
    const publicData = current.floor_area[PUBLIC] ? current.floor_area[PUBLIC] : 0
    const otherData = current.floor_area[OTHER] ? current.floor_area[OTHER] : 0
    const businessPremisesData = current.floor_area[BUSINESS_PREMISES]
      ? current.floor_area[BUSINESS_PREMISES]
      : 0

    const totalData =   current.floor_area[TOTAL] ? current.floor_area[TOTAL] : 0

    const date = new Date(current[DATE]).getTime()

    const meetings = current[MEETINGS]

    if (isPrediction) {
     
      chartData[LIVING + PREDICTION] = livingData !== 0 ? livingData : undefined
      chartData[PUBLIC + PREDICTION] = publicData !== 0 ? publicData : undefined
      chartData[OTHER + PREDICTION] = otherData !== 0 ? otherData : undefined
      chartData[BUSINESS_PREMISES + PREDICTION] = businessPremisesData !== 0 ? businessPremisesData : undefined
      chartData[TOTAL + PREDICTION] = totalData !== 0 ? totalData : undefined
      
    } else {
      chartData[LIVING] = livingData !== 0 ? livingData : undefined
      chartData[PUBLIC] = publicData !== 0 ? publicData : undefined
      chartData[OTHER] = otherData !== 0 ? otherData : undefined
      chartData[BUSINESS_PREMISES] = businessPremisesData !== 0 ? businessPremisesData : undefined
      chartData[TOTAL] = totalData !== 0 ? totalData : undefined
    }

    chartData[MEETINGS] = meetings
    chartData[DATE] = date
  
    floorAreas.push( chartData )

  })

  const realValues = data.daily_stats.filter( value => !value.floor_area.is_prediction)
  
  const lastValue = realValues && realValues[realValues.length - 1]

  if ( lastValue && Object.entries( lastValue ).length > 0 ) {
    modifiedData[LIVING_OVERALL] = lastValue.floor_area[LIVING]
  }
  modifiedData[FLOOR_AREAS] = floorAreas
  
  return modifiedData
}
