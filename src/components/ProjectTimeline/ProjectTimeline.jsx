import React, { useState, useEffect } from 'react'
import './ProjectTimeline.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { findInMonths, findWeek } from './helpers/helpers'

/*
    TYPE_PHASE_START = "phase_start"
    TYPE_PHASE_END = "phase_end"
    TYPE_DASHED_START = "dashed_start"
    TYPE_DASHED_END = "dashed_end"
    TYPE_INNER_START = "inner_start"
    TYPE_INNER_END = "inner_end"
    TYPE_MILESTONE = "milestone"
 */

function ProjectTimeline(props) {
  //const { deadlines } = props
  const [showError /*, setShowError*/] = useState(false)
  const [drawMonths, setDrawMonths] = useState([])
  const [drawItems, setDrawItems] = useState([])
  const monthDates = []
  const months = []
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
      date: '2020-12-21',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'K1',
        identifier: 'K1',
        editable: true,
        deadline_types: ['phase_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Käynnistys',
        phase_color: '#0fff00',
        phase_color_code: '#0fff00',
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
      date: '2021-02-01',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'K2',
        identifier: 'K1',
        editable: true,
        deadline_types: ['phase_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Käynnistys',
        phase_color: '#0fff00',
        phase_color_code: '#0fff00',
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
      date: '2021-02-01',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P1',
        identifier: 'P1',
        editable: true,
        deadline_types: ['phase_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-03-01',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P2',
        identifier: 'P1',
        editable: true,
        deadline_types: ['milestone', 'dashed_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-03-22',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P3',
        identifier: 'P1',
        editable: true,
        deadline_types: ['dashed_end', 'inner_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-04-13',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P4',
        identifier: 'P1',
        editable: true,
        deadline_types: ['inner_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-05-10',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P5',
        identifier: 'P1',
        editable: true,
        deadline_types: ['milestone', 'dashed_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-06-08',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'P1',
        editable: true,
        deadline_types: ['milestone', 'dashed_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-06-08',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P7',
        identifier: 'P1',
        editable: true,
        deadline_types: ['phase_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Periaatteet',
        phase_color: '#35e9ff',
        phase_color_code: '#35e9ff',
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
      date: '2021-06-08',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: '01',
        editable: true,
        deadline_types: ['phase_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'OAS',
        phase_color: '#ff9a00',
        phase_color_code: '#ff9a00',
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
      date: '2021-08-02',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: '01',
        editable: true,
        deadline_types: ['milestone', 'dashed_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'OAS',
        phase_color: '#ff9a00',
        phase_color_code: '#ff9a00',
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
      date: '2021-08-23',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: '01',
        editable: true,
        deadline_types: ['dashed_end', 'inner_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'OAS',
        phase_color: '#ff9a00',
        phase_color_code: '#ff9a00',
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
      date: '2021-09-10',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: '01',
        editable: true,
        deadline_types: ['inner_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'OAS',
        phase_color: '#ff9a00',
        phase_color_code: '#ff9a00',
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
      date: '2021-09-10',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: '01',
        editable: true,
        deadline_types: ['phase_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'OAS',
        phase_color: '#ff9a00',
        phase_color_code: '#ff9a00',
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
      date: '2021-09-10',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['phase_start'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2021-10-04',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['milestone'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2021-10-25',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['milestone'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2021-11-12',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['milestone'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2021-11-12',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['milestone'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2021-11-29',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['milestone'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2022-01-11',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['milestone'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
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
      date: '2022-01-11',
      distance_reference_deadline_id: null,
      deadline: {
        abbreviation: 'P6',
        identifier: 'L1',
        editable: true,
        deadline_types: ['phase_end'],
        date_type_id: null,
        error_past_due: '',
        phase_id: 1,
        phase_name: 'Luonnos',
        phase_color: '#001fff',
        phase_color_code: '#001fff',
        index: 0,
        min_distance: 0,
        error_min_distance_previous: '',
        warning_min_distance_next: ''
      }
    }
  ]

  useEffect(() => {
    createTimelineItems()
  }, [])
  function createMonths() {
    const date = new Date(deadlines[0].date)
    if (date.getMonth() === 0) {
      date.setMonth(11)
    } else {
      date.setMonth(date.getMonth() - 1)
    }
    for (let i = 0; i < 13; i++) {
      if (i > 0) {
        date.setDate(1)
        date.setMonth(date.getMonth() + 1)
      }
      months.push({ date: `${date.getFullYear()}-${date.getMonth() + 1}` })
    }
  }
  function createTimelineMonths() {
    const date = new Date(deadlines[0].date)
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
      monthDates.push({
        date: `${date.getFullYear()}-${date.getMonth() + 1}`,
        week: week
      })
      week++
      if (week > 5) {
        week = 1
      }
    }
  }
  function fillGaps() {
    let deadlineIdentifier = null
    let color_code = null
    let deadlineLength = 2
    let deadlinePropIdentifier = null
    let monthDateIndex = null
    for (let i = 0; i < monthDates.length; i++) {
      for (const prop in monthDates[i]) {
        if (monthDates[i].hasOwnProperty(prop)) {
          if (Object.keys(monthDates[i]).length < 4) {
            if (Array.isArray(monthDates[i][prop].deadline_type)) {
              if (monthDates[i][prop].deadline_type[0] === 'phase_start') {
                deadlineIdentifier = monthDates[i][prop].identifier
                color_code = monthDates[i][prop].color_code
                deadlinePropIdentifier = prop
                monthDateIndex = i
              } else if (monthDates[i][prop].deadline_type[0] === 'phase_end') {
                if (monthDates[monthDateIndex]) {
                  monthDates[monthDateIndex][
                    deadlinePropIdentifier
                  ].deadline_length = deadlineLength
                }
                deadlineIdentifier = null
                color_code = null
                deadlineLength = 2
                monthDateIndex = null
              }
            } else if (deadlineIdentifier && Object.keys(monthDates[i]).length < 3) {
              deadlineLength++
              monthDates[i].midpoint = {
                identifier: deadlineIdentifier,
                deadline_type: ['mid_point'],
                color_code: color_code
              }
            }
          } else {
            if (Array.isArray(monthDates[i][prop].deadline_type)) {
              if (monthDates[i][prop].deadline_type[0] === 'phase_start') {
                deadlineIdentifier = monthDates[i][prop].identifier
                color_code = monthDates[i][prop].color_code
                deadlinePropIdentifier = prop
                monthDateIndex = i
              } else {
                if (monthDates[monthDateIndex]) {
                  monthDates[monthDateIndex][
                    deadlinePropIdentifier
                  ].deadline_length = deadlineLength
                }
                deadlineIdentifier = null
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
                deadlinePropIdentifier
              ].deadline_length = deadlineLength
            }
          }
        }
      }
    }
  }
  function fillMilestoneGaps() {
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
              milestoneType = null
              milestoneDate = null
              milestoneSpace = 0
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
  }
  function createDrawMonths() {
    const drawableMonths = []
    for (let i = 0; i < months.length; i++) {
      const date = new Date(months[i].date)
      if (i === 1) {
        drawableMonths.push(
          <div key={i} className="timeline-month">
            <div className="now-marker">
              <span>Nyt</span>
            </div>
            <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
          </div>
        )
      } else {
        drawableMonths.push(
          <div key={i} className="timeline-month">
            <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
          </div>
        )
      }
    }
    setDrawMonths([...drawableMonths])
  }
  function createDrawItems() {
    const drawableItems = []
    for (let i = 0; i < monthDates.length; i++) {
      if (Object.keys(monthDates[i]).length > 1) {
        if (Object.keys(monthDates[i]).length > 2) {
          let propI = 0
          for (const property in monthDates[i]) {
            if (monthDates[i].hasOwnProperty(property)) {
              if (typeof monthDates[i][property] === 'object') {
                if (Array.isArray(monthDates[i][property].deadline_type)) {
                  propI++
                  if (monthDates[i][property].deadline_type[0] === 'phase_start') {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].identifier}-${i}`}
                        style={{
                          background: monthDates[i][property].color_code
                        }}
                        className="timeline-item first"
                      >
                        <span
                          className={`deadline-name-${
                            monthDates[i][property].deadline_length > 4
                              ? 'over'
                              : 'inside'
                          }`}
                        >
                          {monthDates[i][property].phase_name}
                        </span>
                        {monthDates[i].milestone ? createMilestoneItem(i, propI) : ''}
                      </div>
                    )
                  } else if (monthDates[i][property].deadline_type[0] === 'mid_point') {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].identifier}-${i}`}
                        style={{
                          background: monthDates[i][property].color_code
                        }}
                        className="timeline-item"
                      >
                        {monthDates[i].milestone ? createMilestoneItem(i, propI) : ''}
                      </div>
                    )
                  } else if (monthDates[i][property].deadline_type[0] === 'phase_end') {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].identifier}-${i}`}
                        style={{
                          background: monthDates[i][property].color_code
                        }}
                        className="timeline-item last"
                      >
                        {monthDates[i].milestone ? createMilestoneItem(i, propI) : ''}
                      </div>
                    )
                  } else if (
                    monthDates[i][property].deadline_type[0] === 'start_end_point'
                  ) {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].identifier}-${i}`}
                        style={{
                          background: monthDates[i][property].color_code
                        }}
                        className="timeline-item first last"
                      >
                        <span
                          className={`deadline-name-${
                            monthDates[i][property].deadline_length > 4
                              ? 'inside'
                              : 'over'
                          }`}
                        >
                          {monthDates[i][property].phase_name}
                        </span>
                        {monthDates[i].milestone ? createMilestoneItem(i, propI) : ''}
                      </div>
                    )
                  }
                }
              }
            }
          }
        } else {
          drawableItems.push(
            <div className="timeline-item" key={`${monthDates[i].identifier}-${i}`} /> // space
          )
        }
      }
    }
    setDrawItems([...drawableItems])
  }
  function createMilestoneItem(index, propertyIndex) {
    const date = new Date(monthDates[index].milestoneDate)
    let showMessage = null
    let milestoneType = []
    let listKey = 0
    if (propertyIndex <= 1) {
      monthDates[index].milestone_types.forEach(milestone_type => {
        switch (milestone_type) {
          case 'dashed_start':
            if (monthDates[index].milestone_types.includes('milestone')) {
              showMessage = (
                <span className="milestone-message">{`Määräaika ${date.getDate()}.${date.getMonth() +
                  1} >`}</span>
              )
            }
            milestoneType.push(
              <div key={listKey++} className="milestone-icon square white" />,
              <div key={listKey++} className="milestone-icon square second white" />
            )
            break
          case 'dashed_mid':
            milestoneType.push(
              <div key={listKey++} className="milestone-icon square white" />,
              <div key={listKey++} className="milestone-icon square second white" />
            )
            break
          case 'dashed_end':
            if (monthDates[index].milestone_types.includes('milestone')) {
              showMessage = (
                <span
                  className={`milestone-message ${
                    monthDates[index].milestone_space < 6 ? 'under' : ''
                  }`}
                >{`Kylk ${date.getDate()}.${date.getMonth() + 1}.`}</span>
              )
              milestoneType.push(
                <div key={listKey++} className="milestone-icon sphere black" />
              )
            } else {
              showMessage = (
                <span
                  className={`milestone-message ${
                    monthDates[index].milestone_space < 6 ? 'under' : ''
                  }`}
                >
                  nähtävillä
                </span>
              )
              milestoneType.push(
                <div key={listKey++} className="milestone-icon square white" />
              )
            }
            break
          case 'inner_start':
            milestoneType.push(
              <div key={listKey++} className="milestone-icon inner start white" />
            )
            break
          case 'inner_mid':
            milestoneType.push(
              <div key={listKey++} className="milestone-icon inner white" />
            )
            break
          case 'inner_end':
            milestoneType.push(
              <div key={listKey++} className="milestone-icon inner end white" />
            )
            break
          case 'milestone':
            milestoneType.push(
              <div key={listKey++} className="milestone-icon sphere white" />
            )
            break
          default:
            break
        }
      })
      return (
        <span className="deadline-milestone">
          {milestoneType}
          {showMessage}
        </span>
      )
    } else {
      return null
    }
  }
  function createStartAndEndPoints() {
    deadlines.forEach(deadline => {
      if (
        deadline.deadline.deadline_types[0] === 'phase_start' ||
        deadline.deadline.deadline_types[0] === 'phase_end'
      ) {
        let date = new Date(deadline.date)
        const week = findWeek(date.getDate())
        date = `${date.getFullYear()}-${date.getMonth() + 1}`
        const monthIndex = findInMonths(date, week, monthDates)
        if (monthIndex) {
          if (monthDates[monthIndex][deadline.deadline.identifier]) {
            if (
              monthDates[monthIndex][deadline.deadline.identifier].deadline_type[0] ===
              'phase_start'
            ) {
              if (deadline.deadline.deadline_types[0] === 'phase_end') {
                monthDates[monthIndex][deadline.deadline.identifier] = {
                  identifier: deadline.deadline.identifier,
                  deadline_type: ['start_end_point'],
                  phase_id: deadline.deadline.phase_id,
                  color_code: deadline.deadline.phase_color_code,
                  phase_name: deadline.deadline.phase_name,
                  deadline_length: 2
                }
              }
            }
          } else {
            monthDates[monthIndex][deadline.deadline.identifier] = {
              identifier: deadline.deadline.identifier,
              deadline_type: deadline.deadline.deadline_types,
              phase_id: deadline.deadline.phase_id,
              color_code: deadline.deadline.phase_color_code,
              phase_name: deadline.deadline.phase_name,
              deadline_length: 2
            }
          }
        }
      }
    })
  }
  function createMilestones() {
    deadlines.forEach(deadline => {
      const deadlineTypes = deadline.deadline.deadline_types[0]
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
    })
  }
  function createTimelineItems() {
    createMonths()
    createTimelineMonths()
    createStartAndEndPoints()
    // create deadlines between start and end points.
    fillGaps()
    // create any milestones.
    createMilestones()
    // fill in gaps between milestones
    fillMilestoneGaps()
    createDrawMonths()
    createDrawItems()
  }
  return (
    <div className="timeline-graph-container">
      {showError ? (
        <div className="timeline-error-message">
          <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
          <span>Projektin aikataulu ei ole ajan tasalla.</span>
        </div>
      ) : null}
      <div
        className={`timeline-item-container ${showError ? 'timeline-error' : null}`}
        style={{ gridTemplateColumns: `repeat(${drawItems.length}, 1fr)` }}
      >
        {drawItems}
      </div>
      <div className={`timeline-months ${showError ? 'timeline-error' : null}`}>
        {drawMonths}
      </div>
    </div>
  )
}

export default ProjectTimeline
