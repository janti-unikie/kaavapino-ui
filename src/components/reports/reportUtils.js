import { findIndex } from 'lodash'

export const parseReport = (headers, csvRows, blockColumn, timeRange) => {
  if (!csvRows || !headers) {
    return []
  }
  const kylkDates = new Set()
  csvRows.forEach(row => {
    const dates = row[blockColumn].split(',')

    dates.forEach(date => {
      if (timeRange) {
        const timeRangeDates = timeRange.split(',')

        const startDate = new Date(timeRangeDates[0])

        const endDate = new Date(timeRangeDates[1])

        const dateItems = date.split('.')

        const currentDate = new Date(dateItems[2], dateItems[1], dateItems[0])

        if (currentDate >= startDate && currentDate <= endDate) {
          return kylkDates.add({ date: date.trim(), current: currentDate })
        }
      } else {
        return kylkDates.add({ date: date.trim() })
      }
    })
  })

  const sortedKylkDates = Array.from(kylkDates).sort((a, b) => {
    return a.current < b.current ? -1 : a.current > b.current ? 1 : 0
  })

  const getRows = kylk => {
    const rows = []

    csvRows.forEach(row => {
      const valueArray = row[blockColumn].split(',')

      if (findIndex(valueArray, item => item.trim() === kylk) != -1) {
        rows.push(row)
      }
    })

    return rows
  }

  const returnValue = []

  sortedKylkDates.forEach(item => {
    const value = returnValue.find(current => current.date === item.date)

    if (!value) {
      returnValue.push({ date: item.date.trim(), rows: getRows(item.date.trim()) })
    } else {
      value.rows = getRows(item.date.trim())
    }
  })

  return returnValue
}
