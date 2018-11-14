import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { initializeProject } from '../../actions/projectActions'
import {
  currentProjectSelector,
  currentProjectLoadedSelector,
  changingPhaseSelector
} from '../../selectors/projectSelector'
import { phasesSelector } from '../../selectors/phaseSelector'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
import Timeline from './Timeline'
import ProjectEditPage from '../projectEdit'
import ProjectCardPage from '../projectCard'
import ProjectDocumentsPage from '../projectDocuments'

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
    const { currentProject, changingPhase } = this.props
    if ((!prevProps.currentProject && currentProject) || (prevProps.changingPhase && !changingPhase)) {
      this.setState({ selectedPhase: currentProject.phase })
      document.title = currentProject.name
    }
  }

  switchPhase = (phase) => {
    if (this.props.edit) {
      this.setState({ selectedPhase: phase })
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
    const { edit, documents } = this.props
    if (edit) {
      return `${name}, muokkaa`
    } else if (documents) {
      return `${name}, dokumentit`
    }
    return `${name}, hankekortti`
  }

  getProjectPageContent = () => {
    const { edit, documents, currentProject } = this.props
    const { selectedPhase } = this.state
    if (edit) {
      return <ProjectEditPage selectedPhase={selectedPhase} project={currentProject} />
    } else if (documents) {
      return <ProjectDocumentsPage />
    }

    return (
      <ProjectCardPage
        attributeData={currentProject.attribute_data}
        type={currentProject.type}
      />
    )
  }

  getNavActions = () => {
    const { edit, documents, currentProject: { id } } = this.props
    return (
      <NavActions>
        {
          !(edit || documents) && (
            <div>
              <NavAction to={`/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</NavAction>
              <NavAction to={`/${id}/documents`}> <FontAwesomeIcon icon='file'/>Luo dokumentteja</NavAction>
            </div>
          )}
        {
          (edit || documents) && (
            <div>
              <NavAction to={`/${id}`}><FontAwesomeIcon icon='arrow-left'/>Hankekortti</NavAction>
            </div>
          )}
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
          projectPhase={ currentProject.phase }
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
    currentProjectLoaded: currentProjectLoadedSelector(state),
    changingPhase: changingPhaseSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage)