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
    const { currentProject, changingPhase, edit } = this.props
    if ((!prevProps.currentProject && currentProject) || (prevProps.changingPhase && !changingPhase)) {
      this.setState({ selectedPhase: currentProject.phase })
      document.title = currentProject.name
    }

    if (prevProps.edit && !edit) {
      this.setState({ selectedPhase: currentProject.phase })
    }
  }

  switchPhase = (phase) => {
    if (this.props.edit) {
      this.setState({ selectedPhase: phase })
    }
  }

  getRouteItems = () => {
    const { currentProject, edit, documents } = this.props
    const path = [
      { value: 'Kaavahankkeet', path: '/' },
      { value: `${currentProject.name}`, path: `/${currentProject.id}` }
    ]
    if (edit) {
      path.push({ value: 'Muokkaa', path: `/${currentProject.id}/edit` })
    } else if (documents) {
      path.push({ value: 'Dokumentit', path: `/${currentProject.id}/documents` })
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
    return !(edit || documents) ?
      (
        <NavActions>
          <NavAction to={`/${id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</NavAction>
          <NavAction to={`/${id}/documents`}><FontAwesomeIcon icon='file'/>Luo dokumentteja</NavAction>
          <NavAction onClick={() => window.print()}><FontAwesomeIcon icon='print'/>Tulosta hankekortti</NavAction>
        </NavActions>
      ) :
      (
        <NavActions>
          <NavAction to={`/${id}`}><FontAwesomeIcon icon='arrow-left'/>Hankekortti</NavAction>
        </NavActions>
      )
  }

  render() {
    const { edit, currentProject, phases, currentProjectLoaded } = this.props
    if (!currentProjectLoaded || !phases) {
      return <div className='project-container' />
    }
    const { type, subtype, phase } = currentProject
    const currentPhases = phases.filter(({ project_type, project_subtype }) => {
      return project_type === type && project_subtype === subtype
    })
    const projectPhase = currentPhases.find((p) => p.id === phase)
    const selectedPhase = currentPhases.find((phase) => phase.id === this.state.selectedPhase)

    return (
      <div className='project-container'>
        <NavHeader
          routeItems={this.getRouteItems()}
          title={this.getTitle(currentProject.name)}
          actions={this.getNavActions()}
        />
        <Timeline
          phase={selectedPhase}
          projectPhase={projectPhase}
          items={currentPhases}
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