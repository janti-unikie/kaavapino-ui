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
export function cleanDeadlines(deadlines) {
  let cleanedDeadlines = deadlines
  let deadlineType = null
  deadlines.forEach( function(deadline, index, object) {
    if (deadline.deadline){
      if (deadline.deadline.deadline_types[0]) {
        if (deadline.deadline.deadline_types[0] === 'phase_start' || deadline.deadline.deadline_types[0] === 'phase_end') {
          if (!deadlineType) {
            deadlineType = deadline.deadline.deadline_types[0]
          } else if (deadlineType === deadline.deadline.deadline_types[0]) {
            object.splice(index-1, 1)
            deadlineType = null
          } else {
            deadlineType = deadline.deadline.deadline_types[0]
          }
        } else {
          deadlineType = null
        }
      }
    }
  })
  return cleanedDeadlines
}