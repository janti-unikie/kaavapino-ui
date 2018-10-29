import React, { Component } from 'react'
import { connect } from 'react-redux'
import { usersSelector } from '../../selectors/userSelector'
import { Tab } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fetchProjects, createProject } from '../../actions/projectActions'
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
    this.props.fetchProjects()
  }

  toggleForm = (opened) => this.setState({ formOpen: opened })

  render() {
    const { users } = this.props
    const panes = [
      { menuItem: 'Omat hankkeet', render: () => <List users={users} items={this.props.projects} /> },
      { menuItem: 'Kaikki hankeet', render: () => <List users={users} items={this.props.projects} /> }
    ]
    return (
      <div>
        <NavHeader
          routeItems={[ { value: 'Kaavahankkeet', path: '/' } ]}
          title='Kaavahankkeet'
          large
          actions={() => (
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
    users: usersSelector(state)
  }
}

const mapDispatchToProps = {
  fetchProjects,
  createProject
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListPage)
