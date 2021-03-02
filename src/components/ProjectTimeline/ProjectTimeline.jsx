import React, { useState, useEffect } from 'react'
import './ProjectTimeline.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faSync } from '@fortawesome/free-solid-svg-icons'
import { createMonths } from './helpers/createMonths'
import { createDeadlines } from './helpers/createDeadlines'
import { connect } from 'react-redux'
import { getProject, getProjectSuccessful } from '../../actions/projectActions'
import { timelineProjectSelector } from '../../selectors/projectSelector'
import { findWeek } from './helpers/helpers'

function ProjectTimeline(props) {
  const { deadlines, projectView } = props
  const [showError, setShowError] = useState(false)
  const [drawMonths, setDrawMonths] = useState([])
  const [drawItems, setDrawItems] = useState([])
  const [showLoadProject, setShowLoadProject] = useState(false)
  const [loadingProject, setLoadingProject] = useState(false)
  const [timelineLoaded, setTimelineLoaded] = useState(false)
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
    if (!projectView) {
      if (!timelineLoaded) {
        setShowLoadProject(true)
      }
      const months = createMonths(deadlines)
      createDrawMonths(months.months)
    } else {
      createTimelineItems(deadlines)
    }
  }, [])
  useEffect(() => {
    if (props.timelineProject && loadingProject) {
      props.timelineProject.forEach(timelineProject => {
        if (timelineProject.id === props.id) {
          setLoadingProject(false)
          setShowLoadProject(false)
          createTimelineItems(timelineProject.deadlines)
        }
      })
    }
  }, [props.timelineProject])
  function createNowMarker(week) {
    let nowMarker = []
    for (let i = 1; i <= 5; i++) {
      if (i === week) {
        nowMarker.push(
          <div key={i} className="now-marker">
            <span>Nyt</span>
          </div>
        )
      } else {
        nowMarker.push(<div key={i} className="now-marker-filler" />)
      }
    }
    return nowMarker
  }
  function createDrawMonths(months) {
    const drawableMonths = []
    const nowDate = new Date()
    for (let i = 0; i < months.length; i++) {
      const date = new Date(months[i].date)
      if (i === 1) {
        drawableMonths.push(
          <div key={i} className="timeline-month">
            <div className="timeline-now-month">
              {createNowMarker(findWeek(nowDate.getDate()))}
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
  function checkDeadlineType(monthDates, property, propI, loopIndex) {
    switch (monthDates[loopIndex][property].deadline_type[0]) {
      case 'phase_start':
        return (
          <div
            key={`${monthDates[loopIndex][property].abbreviation}-${loopIndex}`}
            style={{
              background: monthDates[loopIndex][property].color_code
            }}
            className="timeline-item first"
          >
            <span
              className={`deadline-name-${
                monthDates[loopIndex][property].deadline_length > 4 ? 'over' : 'inside'
              }`}
            >
              {monthDates[loopIndex][property].phase_name}
            </span>
            {monthDates[loopIndex].milestone
              ? createMilestoneItem(loopIndex, propI, monthDates)
              : ''}
          </div>
        )
      case 'mid_point':
        return (
          <div
            key={`${monthDates[loopIndex][property].abbreviation}-${loopIndex}`}
            style={{
              background: monthDates[loopIndex][property].color_code
            }}
            className="timeline-item"
          >
            {monthDates[loopIndex].milestone
              ? createMilestoneItem(loopIndex, propI, monthDates)
              : ''}
          </div>
        )
      case 'phase_end':
        if (monthDates[loopIndex][property].not_last_end_point) {
          return (
            <div
              key={`${monthDates[loopIndex][property].abbreviation}-${loopIndex}`}
              style={{
                background: monthDates[loopIndex][property].color_code
              }}
              className='timeline-item'
            >
              {monthDates[loopIndex].milestone
                ? createMilestoneItem(loopIndex, propI, monthDates)
                : ''}
            </div>
          )
        } else {
        return (
          <div
            key={`${monthDates[loopIndex][property].abbreviation}-${loopIndex}`}
            style={{
              background: monthDates[loopIndex][property].color_code
            }}
            className="timeline-item last"
          >
            {monthDates[loopIndex].milestone
              ? createMilestoneItem(loopIndex, propI, monthDates)
              : ''}
          </div>
        )
        }
        break
      case 'start_end_point':
        return (
          <div
            key={`${monthDates[loopIndex][property].abbreviation}-${loopIndex}`}
            style={{
              background: monthDates[loopIndex][property].color_code
            }}
            className="timeline-item first last"
          >
            <span
              className={`deadline-name-${
                monthDates[loopIndex][property].deadline_length > 4 ? 'inside' : 'over'
              }`}
            >
              {monthDates[loopIndex][property].phase_name}
            </span>
            {monthDates[loopIndex].milestone ? createMilestoneItem(loopIndex, propI) : ''}
          </div>
        )
      case 'past_start_point':
        return (
          <div
            key={`${monthDates[loopIndex][property].abbreviation}-${loopIndex}`}
            style={{
              background: monthDates[loopIndex][property].color_code
            }}
            className="timeline-item"
          >
            <span
              className={`deadline-name-${
                monthDates[loopIndex][property].deadline_length > 4 ? 'over' : 'inside'
              }`}
            >
              {monthDates[loopIndex][property].phase_name}
            </span>
            {monthDates[loopIndex].milestone
              ? createMilestoneItem(loopIndex, propI, monthDates)
              : ''}
          </div>
        )
      default:
        return null
    }
  }
  function createDrawItems(monthDates) {
    const drawableItems = []
    const has = Object.prototype.hasOwnProperty
    if (monthDates) {
      for (let i = 0; i < monthDates.length; i++) {
        // object has 2 keys by default (date, week), check if any additional keys have been added
        if (Object.keys(monthDates[i]).length > 2) {
          let propI = 0
          for (const property in monthDates[i]) {
            if (has.call(monthDates[i], property)) {
              if (typeof monthDates[i][property] === 'object') {
                if (Array.isArray(monthDates[i][property].deadline_type)) {
                  propI++
                  drawableItems.push(checkDeadlineType(monthDates, property, propI, i))
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
      setDrawItems([...drawableItems])
    }
  }
  function createMilestoneItem(index, propertyIndex, monthDates) {
    const date = new Date(monthDates[index].milestoneDate)
    let showMessage = null
    let milestoneType = []
    let listKey = 0
    if (monthDates) {
      if (propertyIndex <= 1) {
        if (monthDates[index]) {
          monthDates[index].milestone_types.forEach(milestone_type => {
            switch (milestone_type) {
              case 'dashed_start':
                if (monthDates[index].milestone_types.includes('milestone')) {
                  showMessage = (
                    <span className="milestone-message">{`Määräaika ${date.getDate()}.${
                      date.getMonth() + 1
                    } >`}</span>
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
      } else {
        return null
      }
    } else {
      return null
    }
  }
  function loadProject() {
    if (!loadingProject) {
      props.getProject(props.id)
      setLoadingProject(true)
    }
  }
  function createTimelineItems(timelineDeadlines) {
    const months = createMonths(timelineDeadlines)
    const deadlineArray = createDeadlines(timelineDeadlines)
    if (months.error || deadlineArray.error) {
      setShowError(true)
    }
    createDrawMonths(months.months)
    createDrawItems(deadlineArray.deadlines)
    setTimelineLoaded(true)
  }
  return (
    <div className="timeline-graph-container">
      {showError ? (
        <div className="timeline-error-message">
          <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
          <span>Projektin aikataulu ei ole ajan tasalla.</span>
        </div>
      ) : null}
      {showLoadProject ? (
        <FontAwesomeIcon
          onClick={() => loadProject()}
          className={`timeline-load-project-message ${loadingProject ? 'fa-spin' : null}`}
          icon={faSync}
          size="2x"
        />
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

const mapDispatchToProps = {
  getProject,
  getProjectSuccessful
}

const mapStateToProps = state => {
  return {
    timelineProject: timelineProjectSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectTimeline)
