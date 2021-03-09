import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProjects } from '../../actions/projectActions'
import { fetchProjectSubtypes } from '../../actions/projectTypeActions'
import { fetchUsers } from '../../actions/userActions'
import { projectSubtypesSelector } from '../../selectors/projectTypeSelector'
import { usersSelector } from '../../selectors/userSelector'
import { Responsive, Tab } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createProject } from '../../actions/projectActions'
import {
  ownProjectsSelector,
  projectsSelector,
  amountOfProjectsToShowSelector,
  totalOwnProjectsSelector,
  totalProjectsSelector,
  onHoldProjectSelector,
  archivedProjectSelector
} from '../../selectors/projectSelector'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
import NewProjectFormModal from '../project/NewProjectFormModal'
import List from './List'
import SearchBar from '../SearchBar'
import { withTranslation } from 'react-i18next'
import { userIdSelector } from '../../selectors/authSelector'
import projectUtils from './../../utils/projectUtils'

class ProjectListPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showBaseInformationForm: false,
      filter: '',
      searchOpen: false,
      activeIndex: 0,
      screenWidth: window.innerWidth
    }
  }

  componentDidMount() {
    const { t } = this.props

    document.title = t('title')
    this.props.fetchProjects()
    this.props.fetchUsers()
    this.props.fetchProjectSubtypes()
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ screenWidth: window.innerWidth })
  }

  toggleForm = opened => this.setState({ showBaseInformationForm: opened })

  toggleSearch = opened => {
     this.setState({ searchOpen: opened })

     if ( !opened) {
      this.setFilter('')
      this.props.fetchProjects()
     }
  }

  setFilter = value => this.setState({ filter: value })

  fetchFilteredItems = () => {
    const { filter } = this.state
    this.props.fetchProjects(filter)
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex })
  }

  render() {
    const {
      users,
      projectSubtypes,
      amountOfProjectsToShow,
      ownProjects,
      allProjects,
      totalOwnProjects,
      totalProjects,
      currentUserId,
      onHoldProjects,
      archivedProjects
    } = this.props

    const { searchOpen, activeIndex, screenWidth } = this.state

    const { t } = this.props

    const showCreate = projectUtils.isUserPrivileged(currentUserId, users)

    let panes = [
      {
        menuItem: `${
          screenWidth < 600 ? t('projects.own-short') : t('projects.own-long')
        } (${totalOwnProjects}${totalOwnProjects > 0 ? ' kpl' : ''})`,
        render: () => (
          <List
            projectSubtypes={projectSubtypes}
            users={users}
            items={ownProjects}
            total={totalOwnProjects}
            isUserPrivileged={showCreate}
            toggleSearch={this.toggleSearch}
            setFilter={this.setFilter}
            searchOpen={searchOpen}
            buttonAction={this.fetchFilteredItems}
          />
        )
      },
      {
        menuItem: `${
          screenWidth < 600 ? t('projects.all-short') : t('projects.all-long')
        } (${totalProjects > 0 ? t('projects.amount', { pieces: totalProjects }) : ''})`,
        render: () => (
          <List
            toggleSearch={this.toggleSearch}
            searchOpen={searchOpen}
            projectSubtypes={projectSubtypes}
            users={users}
            items={allProjects}
            total={totalProjects}
            setFilter={this.setFilter}
            isUserPrivileged={showCreate}
          />
        )
      },
      {
        menuItem: `${screenWidth < 600 ? t('projects.onhold-short') : t('projects.onhold-long')}`,
        render: () => (
          <List
            projectSubtypes={projectSubtypes}
            users={users}
            items={onHoldProjects}
            total={totalProjects}
            setFilter={this.setFilter}
            isUserPrivileged={showCreate}
          />
        )
      },
      {
        menuItem: `${screenWidth < 600 ? t('projects.archived-short') : t('projects.archived-long')}`,
        render: () => (
          <List
            projectSubtypes={projectSubtypes}
            users={users}
            items={archivedProjects}
            total={totalProjects}
            setFilter={this.setFilter}
            isUserPrivileged={showCreate}
            buttonAction={this.fetchFilteredItems}
          />
        )
      }
    ]

    if ( !showCreate ) {
      panes = [
        {
          menuItem: `${
            screenWidth < 600 ? t('projects.all-short') : t('projects.all-long')
          } (${totalProjects > 0 ? t('projects.amount', { pieces: totalProjects }) : ''})`,
          render: () => (
            <List
              toggleSearch={this.toggleSearch}
              searchOpen={searchOpen}
              projectSubtypes={projectSubtypes}
              users={users}
              items={allProjects.slice(0, amountOfProjectsToShow)}
              total={totalProjects}
              setFilter={this.setFilter}
              isUserPrivileged={showCreate}
              buttonAction={this.fetchFilteredItems}
            />
          )
        }
      ]
    }

    let headerActions = (
      <NavActions>
        {!searchOpen && (
          <>
            {showCreate && (
              <NavAction onClick={() => this.toggleForm(true)}>
                <FontAwesomeIcon icon="plus" />
                {t('projects.createNewProject')}
              </NavAction>
            )}
            <NavAction to={'/reports'}>{t('projects.createReports')}</NavAction>
          </>
        )}
        <Responsive
          as={SearchBar}
          minWidth={601}
          toggleSearch={this.toggleSearch}
          searchOpen={searchOpen}
          setFilter={this.setFilter}
          buttonAction={this.fetchFilteredItems}
        />
      </NavActions>
    )
    return (
      <div className="project-list-page">
        <NavHeader
          routeItems={[{ value: t('projects.title'), path: '/' }]}
          title={t('projects.title')}
          actions={headerActions}
        />
        <NewProjectFormModal
          open={this.state.showBaseInformationForm}
          handleSubmit={this.props.createProject}
          handleClose={() => this.toggleForm(false)}
          users={users}
          projectSubtypes={projectSubtypes}
        />
        <div className="project-list-container">
          <Tab
            panes={panes}
            activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ownProjects: ownProjectsSelector(state),
    allProjects: projectsSelector(state),
    users: usersSelector(state),
    projectSubtypes: projectSubtypesSelector(state),
    amountOfProjectsToShow: amountOfProjectsToShowSelector(state),
    totalOwnProjects: totalOwnProjectsSelector(state),
    totalProjects: totalProjectsSelector(state),
    currentUserId: userIdSelector(state),
    onHoldProjects: onHoldProjectSelector(state),
    archivedProjects: archivedProjectSelector(state)
  }
}

const mapDispatchToProps = {
  createProject,
  fetchProjects,
  fetchUsers,
  fetchProjectSubtypes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProjectListPage))
