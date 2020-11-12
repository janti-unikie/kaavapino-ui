import React from 'react'
import './ProjectTimeline.scss'

/* POC of how Dead lines could be created*/
const ProjectTimeline = () => {
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

  const projectDeadlines = {
    0: {
      phase: 'Käynnistys' /* this would be phase_id and gotten from phases list*/,
      length: 1 /* how many cells does this occupy, sum of lengths and distancePrevious should not exceed 13 */,
      distancePrevious: 0 /* used to create empty space or distance between deadline */,
      color: '#94ffa5'
    },
    1: {
      phase: 'Periaatteet',
      length: 6,
      distancePrevious: 2,
      color: '#ffd420'
    },
    2: {
      phase: 'OAS',
      length: 3,
      distancePrevious: 1,
      color: '#26aee8'
    }
  }

  function drawDates() {
    const date = new Date()
    let drawMonths = []

    if (date.getMonth() === 0) {
      date.setMonth(11)
    } else {
      date.setMonth(date.getMonth() - 1)
    }
    for (let i = 0; i < 13; i++) {
      if (i > 0) {
        date.setMonth(date.getMonth() + 1)
      }
      // Check for second month to draw marker for now
      if (i === 1) {
        drawMonths.push(
          <div className="timeline-month">
            <div className="now-marker">
              <span>Nyt</span>
            </div>
            <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
          </div>
        )
      } else {
        drawMonths.push(
          <div className="timeline-month">
            <span>{`${monthNames[date.getMonth()]} ${date.getFullYear()}`}</span>
          </div>
        )
      }
    }
    return drawMonths
  }

  function drawTimelineItems() {
    const timelineItems = []
    let deadLinesIteration = 0
    let deadlineLoopIteration = 0

    for (let i = 0; i < 13; i++) {
      const deadLineIterations =
        projectDeadlines[deadLinesIteration].length +
        projectDeadlines[deadLinesIteration].distancePrevious

      if (projectDeadlines[deadLinesIteration].distancePrevious > deadlineLoopIteration) {
        timelineItems.push(
          <div className="timeline-item" /> // space
        )
      } else {
        if (
          deadlineLoopIteration === projectDeadlines[deadLinesIteration].distancePrevious
        ) {
          if (i === 0 && projectDeadlines[deadLinesIteration].length === 1) {
            timelineItems.push(
              <div
                style={{ background: projectDeadlines[deadLinesIteration].color }}
                className="timeline-item last"
              >
                <span>{projectDeadlines[deadLinesIteration].phase}</span>
              </div>
            )
          } else if (i === 0) {
            timelineItems.push(
              <div
                style={{ background: projectDeadlines[deadLinesIteration].color }}
                className="timeline-item"
              >
                <span>{projectDeadlines[deadLinesIteration].phase}</span>
              </div>
            )
          }
          else if (projectDeadlines[deadLinesIteration].length === 1) {
            //first and last
            timelineItems.push(
              <div
                style={{ background: projectDeadlines[deadLinesIteration].color }}
                className="timeline-item first last"
              >
                <span>{projectDeadlines[deadLinesIteration].phase}</span>
              </div>
            )
          } else {
            // first element so that we can round
            timelineItems.push(
              <div
                style={{ background: projectDeadlines[deadLinesIteration].color }}
                className="timeline-item first"
              >
                <span>{projectDeadlines[deadLinesIteration].phase}</span>
              </div>
            )
          }
        } else if (
          deadlineLoopIteration ===
          projectDeadlines[deadLinesIteration].distancePrevious +
            projectDeadlines[deadLinesIteration].length -
            1
        ) {
          // last element so that we can round
          timelineItems.push(
            <div
              style={{ background: projectDeadlines[deadLinesIteration].color }}
              className="timeline-item last"
            />
          )
        } else {
          // filler element "body of bar"
          timelineItems.push(
            <div
              style={{ background: projectDeadlines[deadLinesIteration].color }}
              className="timeline-item filler"
            />
          )
        }
      }

      deadlineLoopIteration++
      if (deadlineLoopIteration === deadLineIterations) {
        deadlineLoopIteration = 0
        deadLinesIteration++
      }
    }
    return timelineItems
  }
  return (
    <div className="timeline-graph-container">
      <div className="timeline-item-container">{drawTimelineItems()}</div>
      <div className="timeline-months">{drawDates()}</div>
    </div>
  )
}

export default ProjectTimeline
