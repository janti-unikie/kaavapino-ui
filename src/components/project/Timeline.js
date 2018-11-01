import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Timeline extends Component {
  render = () => {
    const { items, type, disabled, phase, switchPhase } = this.props
    const timelineItems = items.filter((item) => item.project_type === type)
      .map((timelineItem) => timelineItem.index <= phase - 1 ? { ...timelineItem, active: true } : timelineItem)

    return (
      <div className='timeline-container'>
        <span className='timeline-title'>Hankkeen vaihe</span>
        <div className={`timeline-items ${disabled ? 'disabled' : ''}`}>
          { timelineItems.map((item, i) => {
            const isCompleted = phase > item.index + 1
            const color = item.color
            return (
              <div key={i} className={`timeline-item-container ${item.active ? `active ${color} ${isCompleted ? 'completed' : ''}` : ''}`}>
                <span onClick={() => switchPhase(i + 1)} className={`timeline-item-number ${item.active ? `active ${color} ${isCompleted ? 'completed' : ''}` : ''}`}>
                  { i + 1 }
                  { /* isCompleted && <FontAwesomeIcon icon='check' /> */ }
                </span>
                <span className={`timeline-item-title ${(item.active) ? `active ${color} ${isCompleted ? 'completed' : ''}` : ''}`}>{ item.name }</span>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
}

export default Timeline