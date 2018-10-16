import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestValue } from '../../actions/exampleActions'
import { fetchInputs, fetchProject } from '../../actions/projectActions'
import { exampleValueSelector } from '../../selectors/exampleSelector'
import { projectInputsSelector, selectCurrentProject } from '../../selectors/projectSelector'
import Header from '../common/Header'
import NavHeader from '../common/NavHeader'
import Footer from '../common/Footer'
import Timeline from './Timeline'
import FormPage from '../form'
import SummaryPage from '../summary'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader } from 'semantic-ui-react'

class ProjectPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 1
    }
  }

  componentDidMount = () => {
    this.props.fetchInputs(this.state.tab)
    this.props.fetchProject(this.props.id)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentProject) {
      document.title = nextProps.currentProject.name
    }
  }

  handleClick = () => this.props.requestValue()

  changeTab = (tab) => {
    this.setState({ tab })
    this.props.fetchInputs(tab)
  }

  getSummaryActions = () => {
    return (
      <div>
        <Link to={`/project/${this.props.id}/edit`}><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
        <Link to={`/project/${this.props.id}`}><FontAwesomeIcon icon='file'/>Luo dokumentteja</Link>
        <Link to={`/project/${this.props.id}`}><FontAwesomeIcon icon='forward'/>Lopeta vaihe</Link>
      </div>
    )
  }

  getEditActions = () => {
    console.log('ID', this.props.id)
    return (
      <div>
        <Link to={`/project/${this.props.id}`}><FontAwesomeIcon icon='arrow-left'/>Hankekortti</Link>
      </div>
    )
  }

  render = () => {
    const { edit, currentProject } = this.props
    let id = currentProject ? currentProject.id : 1
    let projectName = ''
    let title = ''
    if (currentProject) {
      title = edit ? `${currentProject.name}, muokkaa` : `${currentProject.name}, hankekortti`
      projectName = currentProject.name
    }
    console.log(projectName)
    return (
      <div className='project-container'>
        <Header />
        <NavHeader id={id} title={title} project={ projectName } edit={edit} actions={!edit ? this.getSummaryActions() : this.getEditActions()} />
        <Timeline tab={ this.state.tab } changeTab={ this.changeTab } />
        <div className='project-content'>
          { currentProject && edit && <FormPage tab={ this.state.tab } inputs={ this.props.inputs } /> }
          { currentProject && !edit && <SummaryPage project={ currentProject } /> }
          { !currentProject && <Loader active /> }
        </div>
        <Footer />
      </div>
    )
  }
}

ProjectPage.propTypes = {
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
}

const mapStateToProps = (state) => {
  return {
    value: exampleValueSelector(state),
    inputs: projectInputsSelector(state),
    currentProject: selectCurrentProject(state)
  }
}

const mapDispatchToProps = {
  requestValue,
  fetchInputs,
  fetchProject
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage)
