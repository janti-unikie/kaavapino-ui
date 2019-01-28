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
import FormModal from './FormModal'
import List from './List'

class ProjectListPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formOpen: false
    }
  }

  componentDidMount() {
    document.title = 'Kaavapino'
    this.props.fetchProjects()
    this.props.fetchUsers()
    this.props.fetchProjectSubtypes()
  }

  toggleForm = (opened) => this.setState({ formOpen: opened })

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
    const panes = [
      { menuItem: 'Omat hankkeet', render: () => <List projectSubtypes={projectSubtypes} users={users} items={ownProjects.slice(0, amountOfProjectsToShow)} total={totalOwnProjects} /> },
      { menuItem: 'Kaikki hankeet', render: () => <List projectSubtypes={projectSubtypes} users={users} items={allProjects.slice(0, amountOfProjectsToShow)} total={totalProjects} /> }
    ]
    return (
      <div className='project-list-page'>
        <NavHeader
          routeItems={[ { value: 'Kaavahankkeet', path: '/' } ]}
          title='Kaavahankkeet'
          large
          actions={(
            <NavActions>
              <NavAction onClick={() => this.toggleForm(true)}><FontAwesomeIcon icon='plus'/>Luo uusi hanke</NavAction>
              <NavAction to={'/reports'}><FontAwesomeIcon icon='file-csv'/>Luo raportteja</NavAction>
            </NavActions>
          )}
        />
        <FormModal
          open={this.state.formOpen}
          handleSubmit={this.props.createProject}
          handleClose={() => this.toggleForm(false)}
          users={users}
          projectSubtypes={projectSubtypes}
        />
        <div className='project-list-container'>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListPage)
