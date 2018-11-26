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
import { projectsSelector } from '../../selectors/projectSelector'
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
    const { users, projectSubtypes } = this.props
    const panes = [
      { menuItem: 'Omat hankkeet', render: () => <List projectSubtypes={projectSubtypes} users={users} items={this.props.projects} /> },
      { menuItem: 'Kaikki hankeet', render: () => <List projectSubtypes={projectSubtypes} items={this.props.projects} /> }
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
    projects: projectsSelector(state),
    users: usersSelector(state),
    projectSubtypes: projectSubtypesSelector(state)
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
