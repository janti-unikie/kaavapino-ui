import React, { Component } from 'react'
import { connect } from 'react-redux'
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
import { NavHeader } from '../common/NavHeader'
import ProjectEditPage from '../projectEdit'
import ProjectCardPage from '../projectCard'
import ProjectDocumentsPage from '../projectDocuments'
import projectUtils from '../../utils/projectUtils'
import NewProjectFormModal from './EditProjectModal/NewProjectFormModal'
import { projectSubtypesSelector } from '../../selectors/projectTypeSelector'
import { withTranslation } from 'react-i18next'

import DownloadProjectDataModal from './DownloadProjectDataModal'
import { DOWNLOAD_PROJECT_DATA_FORM } from '../../constants'
import { getFormValues } from 'redux-form'
import moment from 'moment'
import { userIdSelector } from '../../selectors/authSelector'
import { IconPen, IconPrinter, IconDownload, LoadingSpinner, Button } from 'hds-react'
import { withRouter } from 'react-router-dom'

class ProjectPage extends Component {
  test = React.createRef()
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
  getProjectCardButtons = () => {
    const { t, users } = this.props
    const showCreate = projectUtils.isUserPrivileged(this.props.currentUserId, users)

    return (
      <span className="header-buttons">
        {showCreate && (
          <Button variant="secondary" onClick={this.modifyContent} iconLeft={<IconPen />}>
            {t('project.modify')}
          </Button>
        )}
        <Button variant="secondary" iconLeft={<IconPen />} onClick={this.createDocuments}>
          {t('project.create-documents')}
        </Button>
        <Button
          variant="secondary"
          iconLeft={<IconPrinter />}
          onClick={() => window.print()}
        >
          {t('project.print-project-card')}
        </Button>
        <Button
          variant="secondary"
          iconLeft={<IconPen />}
          onClick={() => this.setState({ showDeadlineModal: true })}
        >
          Määräajat
        </Button>
      </span>
    )
  }
  getEditButtons = () => {
    const { t, users } = this.props
    const showCreate = projectUtils.isUserPrivileged(this.props.currentUserId, users)

    return (
      <span className="header-buttons">
        <Button
          variant="secondary"
          onClick={this.openProjectDataModal}
          iconLeft={<IconDownload />}
        >
          Tulosta projektin tiedot
        </Button>
        {showCreate && (
          <Button
            variant="secondary"
            onClick={() => this.toggleBaseInformationForm(true)}
            iconLeft={<IconPen />}
          >
            {t('project.modify-project')}
          </Button>
        )}
        <Button variant="primary" iconLeft={<IconPen />} onClick={this.checkProjectCard}>
          {t('project.check-project-card')}
        </Button>
      </span>
    )
  }

  getNavActions = () => {
    const { edit } = this.props
    return !edit ? this.getProjectCardButtons() : this.getEditButtons()
  }

  modifyContent = () => {
    const {
      currentProject: { id },
      history
    } = this.props
    history.push(`/${id}/edit`)
  }
  createDocuments = () => {
    const {
      currentProject: { id },
      history
    } = this.props
    history.push(`/${id}/documents`)
  }
  checkProjectCard = () => {
    const {
      currentProject: { id },
      history
    } = this.props
    history.push(`/${id}`)
  }
  openProjectDataModal = () => this.togglePrintProjectDataModal(true)

  toggleBaseInformationForm = opened =>
    this.setState({ ...this.state, showBaseInformationForm: opened })

  getAllChanges = () => {
    const { allEditFields, edit } = this.props

    if (!edit) return []
    return allEditFields.map((f, i) => {
      const value = `${projectUtils.formatDateTime(f.timestamp)} ${f.name} ${f.user_name}`
      return {
        name: f.name,
        label: f.label,
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
            { value: '', path: '/' }
          ]}
        />
        <div className="project-page-content">
          <LoadingSpinner className="loader-icon">{t('loading')}</LoadingSpinner>
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
          modalOpen={this.state.showBaseInformationForm}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProjectPage))
)
