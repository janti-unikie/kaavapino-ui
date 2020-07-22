import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Timeline extends Component {
  render = () => {
    const {
      items,
      type,
      disabled,
      phase,
      projectPhase,
      switchDisplayedPhase
    } = this.props
    const timelineItems = items
      .filter(item => item.project_type === type)
      .map(timelineItem => {
        return timelineItem.index <= projectPhase.index ||
          timelineItem.index === phase.index
          ? { ...timelineItem, active: true }
          : timelineItem
      })
    return (
      <div className="timeline-container">
        <span className="timeline-title">Hankkeen vaihe</span>
        <div className={`timeline-items ${disabled ? 'disabled' : ''}`}>
          {timelineItems.map(({ index, active, color, color_code, name, id }, i) => {
            const isCompleted = projectPhase.index >= index
            const isCurrent = projectPhase.index === index
            const selected = phase.index === index
            const classes = `${
              active ? ` active ${color}${isCompleted ? ' completed' : ''}` : ''
            }${isCurrent ? ' current' : ''}${selected ? ' selected' : ''}`
            return (
              <div key={i} className={`timeline-item-container${classes}`}>
                <span
                  onClick={() => switchDisplayedPhase(id)}
                  className={`timeline-item-number${classes}`}
                  style={{
                    ...(active && {
                      backgroundColor: isCompleted && !selected ? 'white' : color_code
                    })
                  }}
                >
                  {(!isCompleted || isCurrent) && i + 1}
                  {isCompleted && !isCurrent && <FontAwesomeIcon icon="check" />}
                </span>
                <span className={`timeline-item-title${classes}`}>
                  {name}{' '}
                  {isCurrent && (
                    <span>
                      <br />
                      (aktiivinen)
                    </span>
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Timeline
