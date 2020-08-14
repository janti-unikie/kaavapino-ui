import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProjects } from '../../actions/projectActions'
import { fetchProjectSubtypes } from '../../actions/projectTypeActions'
import { fetchUsers } from '../../actions/userActions'
import { projectSubtypesSelector } from '../../selectors/projectTypeSelector'
import { usersSelector } from '../../selectors/userSelector'
import { Tab } from 'semantic-ui-react'
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
      searchOpen: false
    }
  }

  componentDidMount() {
    document.title = 'Kaavapino'
    this.props.fetchProjects()
    this.props.fetchUsers()
    this.props.fetchProjectSubtypes()
  }

  toggleForm = (opened) => this.setState({ showBaseInformationForm: opened })

  toggleSearch = (opened) => this.setState({ searchOpen: opened })

  setFilter = (value) => this.setState({ filter: value })

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
    const { filter, searchOpen } = this.state
    const panes = [
      {
        menuItem: `Omat projektit (${totalOwnProjects})`,
        render: () => (
          <List
            projectSubtypes={projectSubtypes}
            users={users}
            items={ownProjects.slice(0, amountOfProjectsToShow)}
            total={totalOwnProjects}
            filter={filter}
          />
        )
      },
      {
        menuItem: `Kaikki projektit (${totalProjects})`,
        render: () => (
          <List
            projectSubtypes={projectSubtypes}
            users={users}
            items={allProjects.slice(0, amountOfProjectsToShow)}
            total={totalProjects}
            filter={filter}
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
        <SearchBar
          toggleSearch={this.toggleSearch}
          searchOpen={searchOpen}
          onChangeValue={this.setFilter}
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
          <Tab panes={panes} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
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
