import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader } from 'semantic-ui-react'
import {
  initializeProject,
  saveProjectBase,
  changeProjectPhase,
  getProjectSnapshot,
  setSelectedPhaseId
} from '../../actions/projectActions'
import { fetchUsers } from '../../actions/userActions'
import {
  currentProjectSelector,
  currentProjectLoadedSelector,
  changingPhaseSelector,
  selectedPhaseSelector
} from '../../selectors/projectSelector'
import { phasesSelector } from '../../selectors/phaseSelector'
import { allEditFieldsSelector } from '../../selectors/schemaSelector'
import { usersSelector } from '../../selectors/userSelector'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
import ProjectEditPage from '../projectEdit'
import ProjectCardPage from '../projectCard'
import ProjectDocumentsPage from '../projectDocuments'
import projectUtils from '../../utils/projectUtils'
import NewProjectFormModal from './NewProjectFormModal'
import { projectSubtypesSelector } from '../../selectors/projectTypeSelector'
import { withTranslation } from 'react-i18next'

import DownloadProjectDataModal from './DownloadProjectDataModal'
import { DOWNLOAD_PROJECT_DATA_FORM } from '../../constants'
import { getFormValues } from 'redux-form'
import moment from 'moment'
import { userIdSelector } from '../../selectors/authSelector'
class ProjectPage extends Component {
  constructor(props) {
    super(props)
    if (props.currentProject) {
      this.props.setSelectedPhaseId(props.currentProject.phase)
    } else {
      this.props.setSelectedPhaseId(0)
    }

    this.state = {
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
      this.props.setSelectedPhaseId(currentProject.phase)
      this.setState({ deadlines: currentProject.deadlines })
      document.title = currentProject.name
    }
    if (prevProps.edit && !edit) this.props.setSelectedPhaseId(currentProject.phase)
  }

  switchDisplayedPhase = phase => {
    if (this.props.edit) {
      this.props.setSelectedPhaseId(phase)
    }
  }

  getRouteItems = () => {
    const { currentProject, edit, documents } = this.props
    const path = [
      { value: 'Kaavaprojektit', path: '/projects' },
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
    const { selectedPhase } = this.props
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
    }
    if (documents) {
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
      currentProject: { id },
      t,
      users
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

    const showCreate = userRole === 'admin' || userRole === 'create' || userRole === 'edit'

    return !(edit || documents) ? (
      <NavActions>
        <NavAction to={`/${id}/edit`}>
          <FontAwesomeIcon icon="pen" />
          {t('project.modify')}
        </NavAction>
        <NavAction to={`/${id}/documents`}>
          <FontAwesomeIcon icon="file" />
          {t('project.create-documents')}
        </NavAction>
        <NavAction onClick={() => window.print()}>
          <FontAwesomeIcon icon="print" />
          {t('project.print-project-card')}
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
        {showCreate && (
          <NavAction onClick={() => this.toggleBaseInformationForm(true)}>
          {t('project.modify-project')}
          </NavAction>
        )}
        <NavAction to={`/${id}`} primary>
          {t('project.check-project-card')}
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

  togglePrintProjectDataModal = opened =>
    this.setState({ showPrintProjectDataModal: opened })

  renderLoading = () => {
    const { t } = this.props
    return (
      <div className="project-container">
        <NavHeader
          routeItems={[
            { value: 'Kaavaprojektit', path: '/projects' },
            { value: 'Ladataan...', path: '/' }
          ]}
          title={t('loading')}
        />
        <div className="project-page-content">
          <Loader inline={'centered'} active>
            {t('loading')}
          </Loader>
        </div>
      </div>
    )
  }

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
  getProjectSnapshot,
  setSelectedPhaseId
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
    currentUserId: userIdSelector(state),
    selectedPhase: selectedPhaseSelector(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProjectPage))
