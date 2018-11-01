import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initializeProject } from '../../actions/projectActions'
import { currentProjectSelector, currentProjectLoadedSelector } from '../../selectors/projectSelector'
import { phasesSelector } from '../../selectors/phaseSelector'
import { NavHeader } from '../common/NavHeader'
import Timeline from './Timeline'
import ProjectEditPage from '../projectEdit'

class ProjectPage extends Component {
  constructor(props) {
    super(props)

    let selectedPhase
    if (props.currentProject) {
      selectedPhase = props.currentProject.phase
    } else {
      selectedPhase = 0
    }

    this.state = {
      selectedPhase: selectedPhase
    }
  }

  componentDidMount() {
    const { currentProjectLoaded } = this.props
    if (!currentProjectLoaded) {
      this.props.initializeProject(this.props.id)
    }
  }

  componentDidUpdate(prevProps) {
    const { currentProject } = this.props
    if (!prevProps.currentProject && currentProject) {
      this.setState({ selectedPhase: currentProject.phase })
    }
  }

  getRouteItems = () => {
    const { currentProject, edit } = this.props
    const path = [
      { value: 'Kaavahankkeet', path: '/' },
      { value: `${currentProject.name}`, path: `/${currentProject.id}` }
    ]
    if (edit) {
      path.push({ value: 'Muokkaa', path: `/${currentProject.id}/edit` })
    }
    return path
  }

  getTitle = (name) => {
    const { edit } = this.props
    if (edit) {
      return `${name}, muokkaa`
    }
    return name
  }

  switchPhase = (phase) => {
    if (this.props.edit) {
      this.setState({ selectedPhase: phase })
    }
  }

  getProjectPageContent = () => {
    const { edit, currentProject } = this.props
    const { selectedPhase } = this.state
    if (edit) {
      return <ProjectEditPage phase={selectedPhase} project={currentProject} />
    }
  }

  render() {
    const { edit, currentProject, phases, currentProjectLoaded } = this.props
    if (!currentProjectLoaded) {
      return <div className='project-container' />
    }
    const { selectedPhase } = this.state
    return (
      <div className='project-container'>
        <NavHeader
          routeItems={this.getRouteItems()}
          title={this.getTitle(currentProject.name)}
        />
        <Timeline
          phase={ selectedPhase }
          items={phases}
          type={currentProject.type}
          disabled={!edit}
          switchPhase={this.switchPhase}
        />
        <div className='project-page-content'>
          { this.getProjectPageContent() }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  initializeProject
}

const mapStateToProps = (state) => {
  return {
    currentProject: currentProjectSelector(state),
    phases: phasesSelector(state),
    currentProjectLoaded: currentProjectLoadedSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage)