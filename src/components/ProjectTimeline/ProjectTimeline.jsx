import React, { useState } from 'react'
import './ProjectTimeline.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

/* POC of how Dead lines could be created*/
function ProjectTimeline(props) {
  const { /*deadlines,*/ phases } = props
  const [showError /*, setShowError*/] = useState(false)
  const monthDates = []
  const drawMonths = []
  const drawItems = []
  const monthNames = {
    0: 'Tammi',
    1: 'Helmi',
    2: 'Maalis',
    3: 'Huhti',
    4: 'Touko',
    5: 'Kesä',
    6: 'Heinä',
    7: 'Elo',
    8: 'Syys',
    9: 'Loka',
    10: 'Marras',
    11: 'Joulu'
  }
  // mock data
  const deadlines = [
    {
      past_due: false,
      out_of_sync: false,
      is_under_min_distance_previous: false,
      is_under_min_distance_next: false,
      date: '2020-09-20',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'dedline-1',
        identifier: 'dl-1',
        editable: true,
        deadline_type: 'start_point',
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        index: 0,
        min_distance: 0,
        error_min_distance_previous: '',
        warning_min_distance_next: ''
      }
    },
    {
      past_due: false,
      out_of_sync: false,
      is_under_min_distance_previous: false,
      is_under_min_distance_next: false,
      date: '2020-11-20',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'dedline-1',
        identifier: 'dl-1',
        editable: true,
        deadline_type: 'end_point',
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        index: 0,
        min_distance: 0,
        error_min_distance_previous: '',
        warning_min_distance_next: ''
      }
    },
    {
      past_due: false,
      out_of_sync: false,
      is_under_min_distance_previous: false,
      is_under_min_distance_next: false,
      date: '2021-01-20',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'dedline-2',
        identifier: 'dl-2',
        editable: true,
        deadline_type: 'start_point',
        date_type_id: null,
        error_past_due: '',
        phase_id: 20,
        index: 0,
        min_distance: 0,
        error_min_distance_previous: '',
        warning_min_distance_next: ''
      }
    },
    {
      past_due: false,
      out_of_sync: false,
      is_under_min_distance_previous: false,
      is_under_min_distance_next: false,
      date: '2021-03-21',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'dedline-2',
        identifier: 'dl-2',
        editable: true,
        deadline_type: 'milestone',
        date_type_id: null,
        error_past_due: '',
        phase_id: 20,
        index: 0,
        min_distance: 0,
        error_min_distance_previous: '',
        warning_min_distance_next: ''
      }
    },
    {
      past_due: false,
      out_of_sync: false,
      is_under_min_distance_previous: false,
      is_under_min_distance_next: false,
      date: '2021-04-21',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'dedline-2',
        identifier: 'dl-2',
        editable: true,
        deadline_type: 'end_point',
        date_type_id: null,
        error_past_due: '',
        phase_id: 20,
        index: 0,
        min_distance: 0,
        error_min_distance_previous: '',
        warning_min_distance_next: ''
      }
    }
  ]

  function createMonths() {
    const date = new Date(deadlines[0].date)
    if (date.getMonth() === 0) {
      date.setMonth(11)
    } else {
      date.setMonth(date.getMonth() - 1)
    }
    for (let i = 0; i < 13; i++) {
      if (i > 0) {
        date.setMonth(date.getMonth() + 1)
      }
      monthDates.push({ date: `${date.getFullYear()}-${date.getMonth() + 1}` })
    }
  }
  function findInMonths(month) {
    let monthIndex = null
    for (let i = 0; i < monthDates.length; i++) {
      if (month === monthDates[i].date) {
        monthIndex = i
        break
      }
    }
    return monthIndex
  }
  function fillGaps() {
    let deadlineIdentifier = null
    let phaseId = null
    for (let i = 0; i < monthDates.length; i++) {
      if (monthDates[i].deadline_type === 'start_point') {
        deadlineIdentifier = monthDates[i].identifier
        phaseId = monthDates[i].phase_id
      } else if (monthDates[i].deadline_type === 'end_point') {
        deadlineIdentifier = null
        phaseId = null
      } else if (deadlineIdentifier && monthDates[i].deadline_type !== 'milestone') {
        monthDates[i].identifier = deadlineIdentifier
        monthDates[i].deadline_type = 'mid_point'
        monthDates[i].phase_id = phaseId
      }
    }
  }
  function createDrawMonths() {
    for (let i = 0; i < monthDates.length; i++) {
      const date = new Date(monthDates[i].date)
      if (i === 1) {
        drawMonths.push(
          <div key={i} className="timeline-month">
            <div className="now-marker">
              <span>Nyt</span>
            </div>
            <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
          </div>
        )
      } else {
        drawMonths.push(
          <div key={i} className="timeline-month">
            <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
          </div>
        )
      }
    }
  }
  function createDrawItems() {
    for (let i = 0; i < monthDates.length; i++) {
      if (Object.keys(monthDates[i]).length > 1) {
        if (monthDates[i].deadline_type === 'start_point') {
          drawItems.push(
            <div
              key={`${monthDates[i].identifier}-${i}`}
              style={{
                background: phases.find(x => x.id === monthDates[i].phase_id).color_code
              }}
              className="timeline-item first"
            >
              <span>{phases.find(x => x.id === monthDates[i].phase_id).name}</span>
            </div>
          )
        } else if (monthDates[i].deadline_type === 'mid_point') {
          drawItems.push(
            <div
              key={`${monthDates[i].identifier}-${i}`}
              style={{
                background: phases.find(x => x.id === monthDates[i].phase_id).color_code
              }}
              className="timeline-item"
            />
          )
        } else if (monthDates[i].deadline_type === 'milestone') {
          drawItems.push(
            <div
              key={`${monthDates[i].identifier}-${i}`}
              style={{
                background: phases.find(x => x.id === monthDates[i].phase_id).color_code
              }}
              className="timeline-item"
            />
          )
        } else if (monthDates[i].deadline_type === 'end_point') {
          drawItems.push(
            <div
              key={`${monthDates[i].identifier}-${i}`}
              style={{
                background: phases.find(x => x.id === monthDates[i].phase_id).color_code
              }}
              className="timeline-item last"
            />
          )
        }
      } else {
        drawItems.push(
          <div className="timeline-item" key={`${monthDates[i].identifier}-${i}`} /> // space
        )
      }
    }
  }
  function createTimelineItems() {
    createMonths()
    deadlines.forEach(deadline => {
      let date = new Date(deadline.date)
      date = `${date.getFullYear()}-${date.getMonth() + 1}`
      const monthIndex = findInMonths(date)
      if (monthIndex) {
        monthDates[monthIndex].identifier = deadline.deadline.identifier
        monthDates[monthIndex].deadline_type = deadline.deadline.deadline_type
        monthDates[monthIndex].phase_id = deadline.deadline.phase_id
      }
    })
    fillGaps()
    createDrawMonths()
    createDrawItems()
  }
  createTimelineItems()
  return (
    <div className="timeline-graph-container">
      {showError ? (
        <div className="timeline-error-message">
          <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
          <span>Projektin aikataulu ei ole ajan tasalla.</span>
        </div>
      ) : null}
      <div className={`timeline-item-container ${showError ? 'timeline-error' : null}`}>
        {drawItems}
      </div>
      <div className={`timeline-months ${showError ? 'timeline-error' : null}`}>
        {drawMonths}
      </div>
    </div>
  )
}

export default ProjectTimeline
