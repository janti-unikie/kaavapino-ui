import React, { Component } from 'react'
import Button from '../../common/Button'
import { Accordion } from 'semantic-ui-react'
import AccordionTitle from './AccordionTitle'
import './styles.scss'
import RoleHighlightPicker from './roleHighlightPicker'

class QuickNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sectionHeights: [],
      active: 0,
      activePhase: 0
    }
  }

  getPosition = element => {
    let yPosition = 0

    while (element) {
      yPosition += element.offsetTop - element.scrollTop + element.clientTop
      element = element.offsetParent
    }

    return yPosition
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    this.setState({ sectionHeights: this.initSections(this.props.sections) })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate = prevProps => {
    const { phaseTitle, currentPhases, sections } = this.props

    if (phaseTitle !== prevProps.phaseTitle) {
      this.setState({ sectionHeights: this.initSections(sections) })

      /* If the phase has changed through other sources than this navigation, close the nav component */
      const newPhaseIndex = currentPhases.findIndex(
        phase => phase.name === phaseTitle
      )
      console.log(newPhaseIndex, this.state.activePhase)

      if (newPhaseIndex !== this.state.activePhase - 1) {
        this.setState({ activePhase: null })
      }
    }
  }

  initSections = sections => {
    const sectionHeights = []
    if (!sections) {
      return
    }
    sections.forEach(section => {
      const c = document.getElementById(`title-${section.title}`)
      sectionHeights.push({ title: section.title, y: this.getPosition(c) })
    })
    return sectionHeights.sort((a, b) => a.y - b.y)
  }

  handleScroll = () => {
    let activeTitle = 0
    if (!this.state.sectionHeights) {
      return
    }
    this.state.sectionHeights.forEach((section, i) => {
      if (section.y - 20 < window.scrollY) {
        activeTitle = i
      }
    })
    if (activeTitle === this.state.activeTitle) {
      return
    }
    this.setState({ active: activeTitle })
  }

  handleSectionTitleClick = title => {
    const c = document.getElementById(`title-${title}`)
    c.scrollIntoView()
  }

  handleAccordionTitleClick = titleIndex => {
    const { switchDisplayedPhase } = this.props
    const shouldChangePhase = this.state.activePhase !== titleIndex

    if (shouldChangePhase) {
      this.setState({
        activePhase: this.state.activePhase === titleIndex ? null : titleIndex
      })
      switchDisplayedPhase(titleIndex)
    } else {
      this.setState({ activePhase: null })
    }
  }

  render() {
    const { activePhase } = this.state
    const {
      currentPhases,
      changePhase,
      changingPhase,
      validating,
      saving,
      handleSave,
      handleCheck
    } = this.props

    return (
      <div className="quicknav-container">
        <div className="quicknav-navigation-section">
          <h2 className="quicknav-title">Kaavan vaiheet</h2>
          <div className="quicknav-content">
            <Accordion>
              {currentPhases.map((phase, index) => (
                <>
                  <AccordionTitle
                    activePhase={this.state.activePhase}
                    id={phase.id}
                    handleClick={this.handleAccordionTitleClick}
                    index={index}
                  >
                    {phase.name}
                  </AccordionTitle>
                  <Accordion.Content active={activePhase === phase.id}>
                    {this.state.sectionHeights &&
                      this.state.sectionHeights.map((section, i) => {
                        return (
                          <span
                            key={i}
                            className={`quicknav-item ${
                              i === this.state.active ? 'active' : ''
                            }`}
                            onClick={() =>
                              this.handleSectionTitleClick(section.title)
                            }
                          >
                            {section.title}
                          </span>
                        )
                      })}
                  </Accordion.Content>
                </>
              ))}
            </Accordion>
          </div>
        </div>
        <RoleHighlightPicker />
        <div className="quicknav-buttons">
          <Button
            handleClick={handleCheck}
            value="Tarkista"
            help="Korostaa pakolliset puuttuvat kentät"
            secondary
          />
          <Button
            handleClick={handleSave}
            value="Tallenna"
            loading={saving}
            secondary
            help="Tallentaa hankkeen"
          />
          <Button
            handleClick={changePhase}
            value="Lopeta vaihe"
            loading={changingPhase || validating}
            secondary
            fluid
            help="Yrittää lopettaa vaiheen"
          />
        </div>
      </div>
    )
  }
}

export default QuickNav
