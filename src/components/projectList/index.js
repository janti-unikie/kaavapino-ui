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
  totalProjectsSelector
} from '../../selectors/projectSelector'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
import NewProjectFormModal from '../project/NewProjectFormModal'
import List from './List'
import SearchBar from '../SearchBar'

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
    document.title = 'Kaavapino'
    this.props.fetchProjects()
    this.props.fetchUsers()
    this.props.fetchProjectSubtypes()
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  /*
  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.state

    if (prevState.filter !== filter) {
      if (filter.length > 1) {
        this.props.fetchProjects(filter)
      }
    }
  }
   */

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ screenWidth: window.innerWidth })
  }

  toggleForm = opened => this.setState({ showBaseInformationForm: opened })

  toggleSearch = opened => this.setState({ searchOpen: opened })

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
      totalProjects
    } = this.props

    const { searchOpen, activeIndex, screenWidth } = this.state

    const panes = [
      {
        menuItem: `${screenWidth < 600 ? 'Omat' : 'Omat Projektit'} (${totalOwnProjects}${
          totalOwnProjects > 0 ? ' kpl' : ''
        })`,
        render: () => (
          <List
            projectSubtypes={projectSubtypes}
            users={users}
            items={ownProjects.slice(0, amountOfProjectsToShow)}
            total={totalOwnProjects}
          />
        )
      },
      {
        menuItem: `${
          screenWidth < 600 ? 'Kaikki' : 'Kaikki Projektit'
        } (${totalProjects}${totalProjects > 0 ? ' kpl' : ''})`,
        render: () => (
          <List
            toggleSearch={this.toggleSearch}
            searchOpen={searchOpen}
            projectSubtypes={projectSubtypes}
            users={users}
            items={allProjects.slice(0, amountOfProjectsToShow)}
            total={totalProjects}
            setFilter={this.setFilter}
          />
        )
      }
    ]

    let headerActions = (
      <NavActions>
        {!searchOpen && (
          <>
            <NavAction onClick={() => this.toggleForm(true)}>
              <FontAwesomeIcon icon="plus" />
              Luo uusi projekti
            </NavAction>
            <NavAction to={'/reports'}>Tee raportteja</NavAction>
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
          routeItems={[{ value: 'Kaavaprojektit', path: '/' }]}
          title="Kaavaprojektit"
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
    totalProjects: totalProjectsSelector(state)
  }
}

const mapDispatchToProps = {
  createProject,
  fetchProjects,
  fetchUsers,
  fetchProjectSubtypes
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage)
