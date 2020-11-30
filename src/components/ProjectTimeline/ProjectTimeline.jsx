import React, { useState, useEffect } from 'react'
import './ProjectTimeline.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { createMonths } from './helpers/createMonths'
import { createDeadlines } from './helpers/createDeadlines'

function ProjectTimeline(props) {
  const { deadlines } = props
  const [showError, setShowError] = useState(false)
  const [drawMonths, setDrawMonths] = useState([])
  const [drawItems, setDrawItems] = useState([])
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
  useEffect(() => {
    createTimelineItems()
  }, [])
  function createDrawMonths(months) {
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
  function createDrawItems(monthDates) {
    const drawableItems = []
    const has = Object.prototype.hasOwnProperty
    for (let i = 0; i < monthDates.length; i++) {
      if (Object.keys(monthDates[i]).length > 1) {
        if (Object.keys(monthDates[i]).length > 2) {
          let propI = 0
          for (const property in monthDates[i]) {
            if (has.call(monthDates[i], property)) {
              if (typeof monthDates[i][property] === 'object') {
                if (Array.isArray(monthDates[i][property].deadline_type)) {
                  propI++
                  if (monthDates[i][property].deadline_type[0] === 'phase_start') {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].abbreviation}-${i}`}
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
                        {monthDates[i].milestone
                          ? createMilestoneItem(i, propI, monthDates)
                          : ''}
                      </div>
                    )
                  } else if (monthDates[i][property].deadline_type[0] === 'mid_point') {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].abbreviation}-${i}`}
                        style={{
                          background: monthDates[i][property].color_code
                        }}
                        className="timeline-item"
                      >
                        {monthDates[i].milestone
                          ? createMilestoneItem(i, propI, monthDates)
                          : ''}
                      </div>
                    )
                  } else if (monthDates[i][property].deadline_type[0] === 'phase_end') {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].abbreviation}-${i}`}
                        style={{
                          background: monthDates[i][property].color_code
                        }}
                        className="timeline-item last"
                      >
                        {monthDates[i].milestone
                          ? createMilestoneItem(i, propI, monthDates)
                          : ''}
                      </div>
                    )
                  } else if (
                    monthDates[i][property].deadline_type[0] === 'start_end_point'
                  ) {
                    drawableItems.push(
                      <div
                        key={`${monthDates[i][property].abbreviation}-${i}`}
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
            <div className="timeline-item" key={`${monthDates[i].abbreviation}-${i}`} /> // space
          )
        }
      }
    }
    setDrawItems([...drawableItems])
  }
  function createMilestoneItem(index, propertyIndex, monthDates) {
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
                >{`Kylk ${date.getDate()}.${date.getMonth() + 1}. ${
                  monthDates[index].milestone_space
                }`}</span>
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
  function createTimelineItems() {
    const months = createMonths(deadlines)
    const deadlineArray = createDeadlines(deadlines)
    setShowError(months.error)
    createDrawMonths(months.months)
    createDrawItems(deadlineArray)
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
