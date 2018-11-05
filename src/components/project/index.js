import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { initializeProject } from '../../actions/projectActions'
import { currentProjectSelector, currentProjectLoadedSelector } from '../../selectors/projectSelector'
import { phasesSelector } from '../../selectors/phaseSelector'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
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
      document.title = currentProject.name
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
    return `${name}, hankekortti`
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

  getNavActions = () => {
    const { edit, currentProject: { id } } = this.props
    return (
      <NavActions>
        {
          !edit &&
          <NavAction to={`/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</NavAction>
        }
        {
          edit &&
          <NavAction to={`/${id}`}><FontAwesomeIcon icon='arrow-left'/>Hankekortti</NavAction>
        }
      </NavActions>
    )
  }

  render() {
    const { edit, currentProject, phases, currentProjectLoaded } = this.props
    if (!currentProjectLoaded || !phases) {
      return <div className='project-container' />
    }
    const { selectedPhase } = this.state
    return (
      <div className='project-container'>
        <NavHeader
          routeItems={this.getRouteItems()}
          title={this.getTitle(currentProject.name)}
          actions={this.getNavActions()}
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