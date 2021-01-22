import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader } from 'semantic-ui-react'
import {
  initializeProject,
  saveProjectBase,
  changeProjectPhase,
  getProjectSnapshot
} from '../../actions/projectActions'
import { fetchUsers } from '../../actions/userActions'
import {
  currentProjectSelector,
  currentProjectLoadedSelector,
  changingPhaseSelector
} from '../../selectors/projectSelector'
import { phasesSelector } from '../../selectors/phaseSelector'
import { allEditFieldsSelector } from '../../selectors/schemaSelector'
import { usersSelector } from '../../selectors/userSelector'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
import ProjectTimeline from '../ProjectTimeline/ProjectTimeline'
import ProjectEditPage from '../projectEdit'
import ProjectCardPage from '../projectCard'
import ProjectDocumentsPage from '../projectDocuments'
import projectUtils from '../../utils/projectUtils'
import NewProjectFormModal from './NewProjectFormModal'
import { projectSubtypesSelector } from '../../selectors/projectTypeSelector'
import DownloadProjectDataModal from './DownloadProjectDataModal'
import { DOWNLOAD_PROJECT_DATA_FORM } from '../../constants'
import { getFormValues } from 'redux-form'
import moment from 'moment'
import { userIdSelector } from '../../selectors/authSelector'
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
      selectedPhase: selectedPhase,
      showDeadlineModal: false,
      showBaseInformationForm: false,
      showPrintProjectDataModal: false,
      deadlines: null
    }
  }

  componentDidMount() {
    const { currentProjectLoaded, users } = this.props
    if (!currentProjectLoaded) {
      this.props.initializeProject(this.props.id)
    }
    if (!users || users.length === 0) {
      this.props.fetchUsers()
    }
  }

  componentDidUpdate(prevProps) {
    const { currentProject, changingPhase, edit } = this.props
    if (
      (!prevProps.currentProject && currentProject) ||
      (prevProps.changingPhase && !changingPhase)
    ) {
      this.setState({ selectedPhase: currentProject.phase })
      this.setState({ deadlines: currentProject.deadlines })
      document.title = currentProject.name
    }

    if (prevProps.edit && !edit) this.setState({ selectedPhase: currentProject.phase })
  }

  switchDisplayedPhase = phase => {
    if (this.props.edit) {
      this.props.changeProjectPhase(phase)
      this.setState({ selectedPhase: phase })
    }
  }

  getRouteItems = () => {
    const { currentProject, edit, documents } = this.props
    const path = [
      { value: 'Kaavaprojektit', path: '/' },
      { value: `${currentProject.name}`, path: `/${currentProject.id}` }
    ]
    if (edit) {
      path.push({ value: 'Muokkaa', path: `/${currentProject.id}/edit` })
    } else if (documents) {
      path.push({ value: 'Dokumentit', path: `/${currentProject.id}/documents` })
    }
    return path
  }

  getSubTitle = () => {
    const { edit } = this.props
    if (edit) {
      return 'Tietojen muokkaus'
    }
    return null
  }

  getCurrentPhases() {
    let { currentProject, phases } = this.props
    const { type, subtype } = currentProject

    if (!currentProject['create_draft']) {
      phases = phases.filter(e => e.name !== 'Luonnos')
    }
    if (!currentProject['create_principles']) {
      phases = phases.filter(e => e.name !== 'Periaatteet')
    }

    return phases.filter(({ project_type, project_subtype }) => {
      return project_type === type && project_subtype === subtype
    })
  }

  getProjectPageContent = () => {
    const { edit, documents, currentProject, phases } = this.props
    const { selectedPhase } = this.state
    const currentPhases = this.getCurrentPhases()

    if (edit) {
      return (
        <ProjectEditPage
          currentPhases={currentPhases}
          selectedPhase={selectedPhase}
          switchDisplayedPhase={this.switchDisplayedPhase}
          project={currentProject}
        />
      )
    } else if (documents) {
      return <ProjectDocumentsPage />
    }
    return (
      <ProjectCardPage
        attributeData={currentProject.attribute_data}
        type={currentProject.type}
        deadlines={currentProject.deadlines}
        name={currentProject.name}
        subtype={currentProject.subtype}
        phases={phases}
      />
    )
  }

  getNavActions = () => {
    const {
      edit,
      documents,
      users,
      currentProject: { id }
    } = this.props

    const getUserRole = () => {
      let privilege
      if (users) {
        users.forEach(user => {
          if (user.id === this.props.currentUserId) {
            privilege = user.privilege
            return
          }
        })
      }
      return privilege
    }

    const userRole = getUserRole()

    const showCreate = userRole === 'admin' || userRole === 'create'

    return !(edit || documents) ? (
      <NavActions>
        <NavAction to={`/${id}/edit`}>
          <FontAwesomeIcon icon="pen" />
          Muokkaa
        </NavAction>
        <NavAction to={`/${id}/edit`}>
          <FontAwesomeIcon icon="pen" />
          Muokkaa
        </NavAction>
        <NavAction to={`/${id}/documents`}>
          <FontAwesomeIcon icon="file" />
          Luo dokumentteja
        </NavAction>
        <NavAction onClick={() => window.print()}>
          <FontAwesomeIcon icon="print" />
          Tulosta projektikortti
        </NavAction>
        <NavAction onClick={() => this.setState({ showDeadlineModal: true })}>
          <FontAwesomeIcon icon="cog" />
          Määräajat
        </NavAction>
      </NavActions>
    ) : (
      <NavActions>
        {showCreate && (
          <NavAction onClick={this.openProjectDataModal}>
            <FontAwesomeIcon icon="file-csv" />
            Tulosta projektin tiedot
          </NavAction>
        )}
        <NavAction onClick={() => this.toggleBaseInformationForm(true)}>
          Muokkaa luontitietoja
        </NavAction>
        <NavAction to={`/${id}`} primary>
          Katso projektikortti
        </NavAction>
      </NavActions>
    )
  }
  openProjectDataModal = () => this.togglePrintProjectDataModal(true)

  getAllChanges = () => {
    const { allEditFields, edit } = this.props

    if (!edit) return []
    return allEditFields.map((f, i) => {
      const value = `${projectUtils.formatDateTime(f.timestamp)} ${f.name} ${f.user_name}`
      return {
        text: value,
        value: `${value}-${i}`,
        key: `${value}-${i}`,
        oldValue: f.old_value,
        newValue: f.new_value
      }
    })
  }

  toggleBaseInformationForm = opened => this.setState({ showBaseInformationForm: opened })

  togglePrintProjectDataModal = opened =>
    this.setState({ showPrintProjectDataModal: opened })

  renderLoading = () => (
    <div className="project-container">
      <NavHeader
        routeItems={[
          { value: 'Kaavaprojektit', path: '/' },
          { value: 'Ladataan...', path: '/' }
        ]}
        title={'Ladataan...'}
      />
      <div className="project-page-content">
        <Loader inline={'centered'} active>
          Ladataan
        </Loader>
      </div>
    </div>
  )

  downloadProjectData = async () => {
    const { currentProject, getProjectSnapshot, formValues } = this.props

    const phase = formValues['phase']
    const date = formValues['date']

    getProjectSnapshot(currentProject.id, moment(date).format(), phase)
  }

  render() {
    const {
      currentProject,
      phases,
      currentProjectLoaded,
      users,
      projectSubtypes
    } = this.props
    const loading = !currentProjectLoaded || !phases
    const { deadlines } = this.state

    if (loading) {
      return this.renderLoading()
    }
    return (
      <div className="project-container">
        <NavHeader
          routeItems={this.getRouteItems()}
          title={currentProject.name}
          subTitle={this.getSubTitle()}
          actions={this.getNavActions()}
          infoOptions={this.getAllChanges()}
        />
        <ProjectTimeline deadlines={deadlines} projectView={true} />
        <NewProjectFormModal
          currentProject={currentProject}
          open={this.state.showBaseInformationForm}
          initialValues={{
            name: currentProject.name,
            public: currentProject.public,
            subtype: currentProject.subtype,
            user: currentProject.user,
            create_principles: currentProject.create_principles,
            create_draft: currentProject.create_draft
          }}
          handleSubmit={this.props.saveProjectBase}
          handleClose={() => this.toggleBaseInformationForm(false)}
          users={users}
          projectSubtypes={projectSubtypes}
        />
        <DownloadProjectDataModal
          currentProject={currentProject}
          open={this.state.showPrintProjectDataModal}
          initialValues={{}}
          handleClose={() => this.togglePrintProjectDataModal(false)}
        />
        <div className="project-page-content">{this.getProjectPageContent()}</div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  initializeProject,
  saveProjectBase,
  fetchUsers,
  changeProjectPhase,
  getProjectSnapshot
}

const mapStateToProps = state => {
  return {
    currentProject: currentProjectSelector(state),
    phases: phasesSelector(state),
    users: usersSelector(state),
    projectSubtypes: projectSubtypesSelector(state),
    currentProjectLoaded: currentProjectLoadedSelector(state),
    changingPhase: changingPhaseSelector(state),
    allEditFields: allEditFieldsSelector(state),
    formValues: getFormValues(DOWNLOAD_PROJECT_DATA_FORM)(state),
    currentUserId: userIdSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
