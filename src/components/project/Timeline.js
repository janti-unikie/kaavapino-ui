import React, { Component } from 'react'

const mockTimelineItems = [
  { title: 'KÄYNNISTYS', active: true },
  { title: 'OAS', active: false },
  { title: 'EHDOTUS', active: false },
  { title: 'TARKISTETTU EHDOTUS', active: false },
  { title: 'KANSLIA-KHS-VALTUUSTO', active: false },
  { title: 'VOIMAANTULO', active: false }
]

class Timeline extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timelineItems: this.updateTimelineItems(mockTimelineItems, props.tab)
    }
  }

  componentWillReceiveProps = ({ tab }) => {
    if (tab !== this.props.tab) {
      this.setState({ timelineItems: this.updateTimelineItems(this.state.timelineItems, tab) })
    }
  }

  updateTimelineItems = (timelineItems, tab) => {
    return timelineItems.map((item, i) => {
      if (i <= tab - 1) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
  }

  changeTab = (newTab) => this.props.changeTab(newTab)

  render = () => {
    return (
      <div className='timeline-container'>
        <span className='timeline-title'>Hankkeen vaihe</span>
        <div className='timeline-items'>
          { mockTimelineItems.map((item, i) => {
            return (
              <div key={i} className={`timeline-item-container ${item.active ? 'active' : ''}`}>
                <span onClick={() => this.changeTab(i + 1)} className={`timeline-item-number ${item.active ? 'active' : ''}`}>{ i + 1 }</span>
                <span className={`timeline-item-title ${item.active ? 'active' : ''}`}>{ item.title }</span>
              </div>
            )
          }) }
        </div>
      </div>
    )
  }
}

export default Timeline
