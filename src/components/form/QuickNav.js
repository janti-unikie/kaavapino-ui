import React, { Component } from 'react'
import { Divider } from 'semantic-ui-react'

class QuickNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sectionHeights: [],
      active: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.setState({ sectionHeights: this.initSections(this.props.inputs.sections) })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.inputs.title !== prevProps.inputs.title) {
      this.setState({ sectionHeights: this.initSections(this.props.inputs.sections) })
    }
  }

  initSections = (sections) => {
    const sectionHeights = []
    if (!sections) {
      return
    }
    sections.forEach((section) => {
      const c = document.getElementById(`title-${section.title}`)
      sectionHeights.push({ title: section.title, y: c.offsetTop })
    })
    return sectionHeights.sort((a, b) => a.y - b.y)
  }

  handleScroll = () => {
    let activeTitle = 0
    if (!this.state.sectionHeights) {
      return
    }
    this.state.sectionHeights.forEach((section, i) => {
      if (section.y < window.scrollY + 60) {
        activeTitle = i
      }
    })
    if (activeTitle === this.state.activeTitle) {
      return
    }
    this.setState({ active: activeTitle })
  }

  handleClick = (title) => {
    const c = document.getElementById(`title-${title}`)
    c.scrollIntoView()
  }

  render() {
    return (
      <div className='quicknav-container'>
        <span className='quicknav-title'>{ this.props.project}</span>
        <Divider style={{ whiteSpace: 'pre-wrap' }} horizontal>{ this.props.inputs.title }</Divider>
        { this.state.sectionHeights && this.state.sectionHeights.map((section, i) => {
          return (
            <span key={i} className={`quicknav-item ${i === this.state.active ? 'active' : ''}`} onClick={() => this.handleClick(section.title)}>{ section.title }</span>
          )
        }) }
      </div>
    )
  }
}

export default QuickNav