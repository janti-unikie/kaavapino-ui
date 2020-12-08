import { findInMonths, findWeek } from './helpers'
/**
 * @desc creates array of deadlines with milestones that should be rendered, from deadline
 * @param deadlines - deadlines from api
 * @return function
 */
export function createDeadlines(deadlines) {
  if (!deadlines) {
    return { deadlines: null, error: true }
  }
  if (!deadlines[0]) {
    return { deadlines: null, error: true }
  }
  if (!deadlines[0].date) {
    return { deadlines: null, error: true }
  }
  const date = new Date(deadlines[0].date)
  let monthDatesArray = []
  let week = 1
  if (date.getMonth() === 0) {
    date.setMonth(11)
  } else {
    date.setMonth(date.getMonth() - 1)
  }
  for (let i = 0; i < 65; i++) {
    if (i > 0 && Number.isInteger(i / 5)) {
      date.setDate(1)
      date.setMonth(date.getMonth() + 1)
    }
    monthDatesArray.push({
      date: `${date.getFullYear()}-${date.getMonth() + 1}`,
      week: week
    })
    week++
    if (week > 5) {
      week = 1
    }
  }
  return createStartAndEndPoints(monthDatesArray, deadlines)
}
/**
 * @desc checks deadlines for start and end points and adds them to the month object
 * @param inputMonths - array that contains months
 * @param deadlines - deadlines returned from api
 * @return function
 */
function createStartAndEndPoints(inputMonths, deadlines) {
  if (!inputMonths || !deadlines) {
    return { deadlines: null, error: true }
  }
  let monthDates = inputMonths
  deadlines.forEach(deadline => {
    if (deadline.deadline) {
      if (
        deadline.deadline.deadline_types[0] === 'phase_start' ||
        deadline.deadline.deadline_types[0] === 'phase_end'
      ) {
        let date = new Date(deadline.date)
        const week = findWeek(date.getDate())
        date = `${date.getFullYear()}-${date.getMonth() + 1}`
        const monthIndex = findInMonths(date, week, monthDates)
        if (monthIndex) {
          if (monthDates[monthIndex][deadline.deadline.abbreviation]) {
            if (
              monthDates[monthIndex][deadline.deadline.abbreviation].deadline_type[0] ===
              'phase_start'
            ) {
              if (deadline.deadline.deadline_types[0] === 'phase_end') {
                monthDates[monthIndex][deadline.deadline.abbreviation] = {
                  abbreviation: deadline.deadline.abbreviation,
                  deadline_type: ['start_end_point'],
                  phase_id: deadline.deadline.phase_id,
                  color_code: deadline.deadline.phase_color_code,
                  phase_name: deadline.deadline.phase_name,
                  deadline_length: 2
                }
              }
            }
          } else {
            monthDates[monthIndex][deadline.deadline.abbreviation] = {
              abbreviation: deadline.deadline.abbreviation,
              deadline_type: deadline.deadline.deadline_types,
              phase_id: deadline.deadline.phase_id,
              color_code: deadline.deadline.phase_color_code,
              phase_name: deadline.deadline.phase_name,
              deadline_length: 2
            }
          }
        }
      }
    }
  })
  return fillGaps(monthDates, deadlines)
}
/**
 * @desc fills gaps between start and end points with mid points with the same key
 * @param inputMonths - array that contains months
 * @param deadlines - deadlines returned from api
 * @return function
 */
function fillGaps(inputMonths, deadlines) {
  if (!inputMonths || !deadlines) {
    return { deadlines: null, error: true }
  }
  let monthDates = inputMonths
  let deadlineAbbreviation = null
  let color_code = null
  let deadlineLength = 2
  let deadlinePropAbbreviation = null
  let monthDateIndex = null
  const has = Object.prototype.hasOwnProperty
  for (let i = 0; i < monthDates.length; i++) {
    for (const prop in monthDates[i]) {
      if (has.call(monthDates[i], prop)) {
        if (Object.keys(monthDates[i]).length < 4) {
          if (Array.isArray(monthDates[i][prop].deadline_type)) {
            if (monthDates[i][prop].deadline_type[0] === 'phase_start') {
              deadlineAbbreviation = monthDates[i][prop].abbreviation
              color_code = monthDates[i][prop].color_code
              deadlinePropAbbreviation = prop
              monthDateIndex = i
            } else if (monthDates[i][prop].deadline_type[0] === 'phase_end') {
              if (monthDates[monthDateIndex]) {
                monthDates[monthDateIndex][
                  deadlinePropAbbreviation
                ].deadline_length = deadlineLength
              }
              deadlineAbbreviation = null
              color_code = null
              deadlineLength = 2
              monthDateIndex = null
            }
          } else if (deadlineAbbreviation && Object.keys(monthDates[i]).length < 3) {
            deadlineLength++
            monthDates[i].midpoint = {
              abbreviation: deadlineAbbreviation,
              deadline_type: ['mid_point'],
              color_code: color_code
            }
          }
        } else {
          if (Array.isArray(monthDates[i][prop].deadline_type)) {
            if (monthDates[i][prop].deadline_type[0] === 'phase_start') {
              deadlineAbbreviation = monthDates[i][prop].abbreviation
              color_code = monthDates[i][prop].color_code
              deadlinePropAbbreviation = prop
              monthDateIndex = i
            } else {
              if (monthDates[monthDateIndex]) {
                monthDates[monthDateIndex][
                  deadlinePropAbbreviation
                ].deadline_length = deadlineLength
              }
              deadlineAbbreviation = null
              color_code = null
              monthDateIndex = null
              deadlineLength = 2
            }
          }
        }
        // Dont round out last milestone item
        if (i >= 64) {
          if (monthDates[monthDateIndex]) {
            monthDates[monthDateIndex][
              deadlinePropAbbreviation
            ].deadline_length = deadlineLength
          }
        }
      }
    }
  }
  return createMilestones(monthDates, deadlines)
}
/**
 * @desc checks for milestones in deadlines adds them to the month object
 * @param inputMonths - array that contains months
 * @param deadlines - deadlines returned from api
 * @return function
 */
function createMilestones(inputMonths, deadlines) {
  if (!inputMonths || !deadlines) {
    return { deadlines: null, error: true }
  }
  let monthDates = inputMonths
  deadlines.forEach(deadline => {
    for (let deadlineTypeIndex in deadline.deadline.deadline_types) {
      const deadlineTypes = deadline.deadline.deadline_types[deadlineTypeIndex]
      if (
        deadlineTypes === 'milestone' ||
        deadlineTypes === 'dashed_start' ||
        deadlineTypes === 'dashed_end' ||
        deadlineTypes === 'inner_start' ||
        deadlineTypes === 'inner_end'
      ) {
        let date = new Date(deadline.date)
        const week = findWeek(date.getDate())
        date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const monthIndex = findInMonths(date, week, monthDates)
        if (monthIndex) {
          monthDates[monthIndex].milestone = true
          monthDates[monthIndex].milestoneDate = date
          monthDates[monthIndex].milestone_types = deadline.deadline.deadline_types
        }
      }
    }
  })
  return fillMilestoneGaps(monthDates)
}
/**
 * @desc fills gaps between different types of milestones
 * @param inputMonths - array that contains months
 * @return array
 */
function fillMilestoneGaps(inputMonths) {
  if (!inputMonths) {
    return { deadlines: null, error: true }
  }
  let monthDates = inputMonths
  let milestoneType = null
  let milestoneDate = null
  let milestoneSpace = 0
  for (let i = 0; i < monthDates.length; i++) {
    if (monthDates[i].milestone) {
      for (let milestone_type in monthDates[i].milestone_types) {
        switch (monthDates[i].milestone_types[milestone_type]) {
          case 'dashed_start':
            milestoneType = 'dashed_mid'
            milestoneDate = monthDates[i].milestoneDate
            milestoneSpace = 1
            break
          case 'dashed_end':
            monthDates[i].milestone_space = milestoneSpace
            milestoneType = null
            milestoneDate = null
            milestoneSpace = 0
            break
          case 'inner_start':
            milestoneType = 'inner_mid'
            milestoneDate = monthDates[i].milestoneDate
            milestoneSpace = 1
            break
          case 'inner_end':
            monthDates[i].milestone_space = milestoneSpace
            milestoneType = null
            milestoneDate = null
            milestoneSpace = 0
            break
          default:
            break
        }
      }
    } else if (milestoneType !== null) {
      monthDates[i].milestone = true
      monthDates[i].milestoneDate = milestoneDate
      monthDates[i].milestone_types = [milestoneType]
    }
    if (milestoneSpace > 0) {
      milestoneSpace++
    }
  }
  return { deadlines: monthDates, error: false }
}
