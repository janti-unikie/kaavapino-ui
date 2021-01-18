/**
 * @desc creates array of months that should be rendered, from first date of deadline
 * @param deadlines - deadlines from api
 * @return object - with months array, error
 */
export function createMonths(deadlines) {
  let date = new Date()
  let error = false
  let monthArray = []
  if (!deadlines) {
    date = new Date()
    error = true
  }
  if (date.getFullYear() < 1980) {
    date = new Date()
    error = true
  }
  date.setMonth(date.getMonth() - 1)
  for (let i = 0; i < 13; i++) {
    if (i > 0) {
      date.setDate(1)
      date.setMonth(date.getMonth() + 1)
    }
    monthArray.push({ date: `${date.getFullYear()}-${date.getMonth() + 1}` })
  }
  // if date is not set will return Jan 01 1970 and will show error
  if (error) {
    return { months: monthArray, error: true }
  } else {
    return { months: monthArray, error: false }
  }
}
