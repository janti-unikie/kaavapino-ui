export function findInMonths(date, week, monthDates) {
  date = new Date(date)
  date = `${date.getFullYear()}-${date.getMonth() + 1}`
  let monthIndex = null
  for (let i = 0; i < monthDates.length; i++) {
    if (date === monthDates[i].date && week === monthDates[i].week) {
      monthIndex = i
      break
    }
  }
  return monthIndex
}
export function findWeek(date) {
  if (Math.round(date / 5) < 1) {
    return 1
  } else if (Math.round(date / 5) > 5) {
    return 5
  } else {
    return Math.round(date / 5)
  }
}