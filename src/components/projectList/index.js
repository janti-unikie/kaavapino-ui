import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavHeader, NavActions, NavAction } from '../common/NavHeader'
import FormModal from './FormModal'
import List from './List'

class ProjectListPage extends Component {
  constructor (props) {
    super(props)

    this.panes = [
      { menuItem: 'Omat hankkeet', render: () => <List /> },
      { menuItem: 'Kaikki hankeet', render: () => <List /> }
    ]

    this.state = {
      formOpen: false
    }
  }

  toggleForm = (opened) => this.setState({ formOpen: opened })

  render () {
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
        <FormModal open={this.state.formOpen} handleClose={() => this.toggleForm(false)} />
        <div className='project-list-container'>
          <Tab panes={this.panes} />
        </div>
      </div>
    )
  }
}

export default ProjectListPage
