import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Timeline extends Component {
  getClasses = ({ index, color, active }) => {
    const { projectPhase, phase } = this.props
    const isCompleted = projectPhase >= index
    const isCurrent = projectPhase === index
    const selected = phase === index
    return `${active ? ` active ${color}${isCompleted ? ' completed' : ''}` : ''}${isCurrent ? ' current' : ''}${selected ? ' selected' : ''}`
  }

  render = () => {
    const { items, type, disabled, phase, projectPhase, switchPhase } = this.props
    const timelineItems = items.filter((item) => item.project_type === type)
      .map((timelineItem) => {
        return (timelineItem.index <= projectPhase || timelineItem.index === phase) ?
          { ...timelineItem, active: true } :
          timelineItem
      })
    return (
      <div className='timeline-container'>
        <span className='timeline-title'>Hankkeen vaihe</span>
        <div className={`timeline-items ${disabled ? 'disabled' : ''}`}>
          { timelineItems.map((item, i) => {
            const isCompleted = projectPhase >= item.index
            const isCurrent = projectPhase === item.index
            return (
              <div key={i} className={`timeline-item-container${this.getClasses(item)}`}>
                <span onClick={() => switchPhase(i + 1)} className={`timeline-item-number${this.getClasses(item)}`}>
                  { (!isCompleted || isCurrent) && i + 1 }
                  { isCompleted && !isCurrent && <FontAwesomeIcon icon='check' /> }
                </span>
                <span className={`timeline-item-title${this.getClasses(item)}`}>{ item.name } { isCurrent && <span><br />(aktiivinen)</span> }</span>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
}

export default Timeline