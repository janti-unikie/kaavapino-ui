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
import CreateForm from './CreateForm'

class ProjectListPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formOpen: false
    }
  }

  openForm = () => this.setState({ formOpen: true })

  closeForm = () => this.setState({ formOpen: false })

  componentDidMount() {
    this.props.fetchOwnProjects()
    this.props.fetchAllProjects()
    document.title = 'Kaavapino'
  }

  render() {
    const panes = [
      { menuItem: 'Omat hankkeet', render: () => <List items={this.props.ownProjects} graph /> },
      { menuItem: 'Kaikki hankkeet', render: () => <List items={this.props.allProjects} /> }
    ]
    return (
      <div>
        <Header />
        <NavHeader title='Kaavahankkeet' largeTitle actions={<Link onClick={this.openForm} className='project-list-button' to='/'><FontAwesomeIcon icon='plus'/>Luo uusi hanke</Link>} />
        <CreateForm open={this.state.formOpen} handleClose={this.closeForm} />
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