import React, { Component } from 'react'
import Header from '../common/Header'
import NavHeader from '../common/NavHeader'
import Footer from '../common/Footer'
import List from './List'
import { Tab } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { ownProjectsSelector, allProjectsSelector } from '../../selectors/projectSelector'
import { fetchOwnProjects, fetchAllProjects } from '../../actions/projectActions'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProjectListPage extends Component {
  componentDidMount() {
    this.props.fetchOwnProjects()
    this.props.fetchAllProjects()
  }

  render() {
    const panes = [
      { menuItem: 'Omat hankkeet', render: () => <List items={this.props.ownProjects} /> },
      { menuItem: 'Kaikki hankkeet', render: () => <List items={this.props.allProjects} /> }
    ]
    return (
      <div>
        <Header />
        <NavHeader title='Kaavahankkeet' largeTitle actions={<Link className='project-list-button' to='/'><FontAwesomeIcon icon='plus'/>Luo uusi hanke</Link>} />
        <div className='project-list-container'>
          <Tab panes={panes} />
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ownProjects: ownProjectsSelector(state),
    allProjects: allProjectsSelector(state)
  }
}

const mapDispatchToProps = {
  fetchOwnProjects,
  fetchAllProjects
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListPage)