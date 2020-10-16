import React, { Component } from 'react'
import Button from '../../common/Button'
import { Accordion, Form } from 'semantic-ui-react'
import AccordionTitle from './AccordionTitle'
import './styles.scss'
import RoleHighlightPicker from './roleHighlightPicker'
import _ from 'lodash'
import FormField from '../../input/FormField'
import { reduxForm } from 'redux-form'
import { NEW_PROJECT_FORM } from '../../../constants'

const ONHOLD = 'onhold'

class QuickNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sectionHeights: [],
      active: 0,
      activePhase: 0,
      selected: 0
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
      const newPhaseIndex = currentPhases.findIndex(phase => phase.name === phaseTitle)

      if (newPhaseIndex !== this.state.activePhase - 1) {
        this.setState({ activePhase: null, selected: null })
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

  handleSectionTitleClick = (title, index) => {
    const c = document.getElementById(`title-${title}`)
    c.scrollIntoView()

    this.setState({
      ...this.state,
      selected: index
    })
  }

  handleAccordionTitleClick = titleIndex => {
    const { switchDisplayedPhase } = this.props
    const shouldChangePhase = this.state.activePhase !== titleIndex

    if (shouldChangePhase) {
      this.setState({
        activePhase: this.state.activePhase === titleIndex ? null : titleIndex
      })
      switchDisplayedPhase(titleIndex)

      const accordionTitle = document.getElementById('accordion-title')
      if (accordionTitle) {
        accordionTitle.scrollIntoView()
      }
    } else {
      this.setState({ activePhase: null })
    }
  }

  tryToEndPhase = () => this.props.validateProjectFields()

  getFormField = fieldProps => {
    const { formSubmitErrors, formValues } = this.props

    const error =
      formSubmitErrors &&
      fieldProps &&
      fieldProps.field &&
      formSubmitErrors[fieldProps.field.name]

    return (
      <FormField
        {...fieldProps}
        error={error}
        formValues={formValues}
      />
    )
  }

  render() {
    const { activePhase } = this.state
    const {
      currentPhases,
      changingPhase,
      validating,
      saving,
      handleSave,
      handleCheck,
      syncronousErrors,
      currentProject,
      saveProjectBase
    } = this.props

   const errors = syncronousErrors && !_.isEmpty(syncronousErrors) ? true : false
    return (
      <div className="quicknav-container">
        <div className="quicknav-navigation-section">
          <h2 className="quicknav-title">Kaavan vaiheet</h2>
          <div className="quicknav-content">
            <Accordion>
              {currentPhases.map((phase, index) => (
                <React.Fragment key={index}>
                  <AccordionTitle
                    activePhase={this.state.activePhase}
                    id={phase.id}
                    handleClick={this.handleAccordionTitleClick}
                    index={index}
                    list_prefix={phase.list_prefix}
                  >
                    {phase.name}
                  </AccordionTitle>
                  <Accordion.Content active={activePhase === phase.id}>
                    {this.state.sectionHeights &&
                      this.state.sectionHeights.map((section, index) => {
                        return (
                          <span
                            key={index}
                            className={`quicknav-item ${
                              index === this.state.selected ? 'active' : ''
                            }`}
                            onClick={() =>
                              this.handleSectionTitleClick(section.title, index)
                            }
                          >
                            {section.title}
                          </span>
                        )
                      })}
                  </Accordion.Content>
                </React.Fragment>
              ))}
            </Accordion>
          </div>
        </div>
        <RoleHighlightPicker onRoleUpdate={this.props.setHighlightRole}/>
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
            loading={saving || errors }
            secondary
            help="Tallentaa projektin"
          />
          <Button
            handleClick={this.tryToEndPhase}
            value="Lopeta vaihe"
            loading={changingPhase || validating}
            secondary
            fluid
            help="Yrittää lopettaa vaiheen"
          />
        </div>
        <Form className='quicknav-onhold-form'>
          {this.getFormField({
            field: {
              name: ONHOLD,
              label: 'Projekti on toistaiseksi keskeytynyt',
              type: 'checkbox',
              onhold: currentProject.onhold,
              saveProjectBase: saveProjectBase,
              disabled: saving
            }
          })}
        </Form>
      </div>
    )
  }
}

const QuickNavForm = reduxForm({
  form: NEW_PROJECT_FORM
})(QuickNav)

export default QuickNavForm
