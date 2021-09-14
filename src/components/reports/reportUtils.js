import { findIndex } from 'lodash'
export const parseKYLKReport = (headers, csvRows) => {

  if (!csvRows || !headers) {
    return []
  }
  const kylkDates = new Set()
  csvRows.forEach(row => {

    const dates = row['KYLK'].split(',')

    dates.forEach( date=>{
        return kylkDates.add(date.trim())
    })
  })

  const getRows = kylk => {
      const rows = []

      csvRows.forEach( row => {
          const valueArray = row['KYLK'].split(',')

          if ( findIndex( valueArray, item => item.trim() === kylk ) != -1) {
            rows.push( row )
          }
      })

      return rows;

  } 

  const returnValue = []

  for ( let item of kylkDates ) {

  const value = returnValue.find( current => current.date === item )
    
    if ( !value ) {
        returnValue.push({ date: item.trim(), rows: getRows(item.trim())})
   } else {
    value.rows.push( getRows( item ))
    }
  }
  return returnValue
}
 