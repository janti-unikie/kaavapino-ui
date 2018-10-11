import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestValue } from '../../actions/exampleActions'
import { fetchInputs } from '../../actions/projectActions'
import { exampleValueSelector } from '../../selectors/exampleSelector'
import { projectInputsSelector } from '../../selectors/projectSelector'
import Header from '../common/Header'
import NavHeader from '../common/NavHeader'
import Footer from '../common/Footer'
import Timeline from './Timeline'
import FormPage from '../form'
import SummaryPage from '../summary'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProjectPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tab: 1
    }
  }

  componentDidMount = () => this.props.fetchInputs(this.state.tab)

  handleClick = () => this.props.requestValue()

  changeTab = (tab) => {
    this.setState({ tab })
    this.props.fetchInputs(tab)
  }

  getActions = () => {
    return (
      <div>
        <Link to='/project/edit'><FontAwesomeIcon icon='pen'/>Muokkaa</Link>
        <Link to='/project'><FontAwesomeIcon icon='file'/>Luo dokumentteja</Link>
        <Link to='/project'><FontAwesomeIcon icon='forward'/>Lopeta vaihe</Link>
      </div>
    )
  }

  render = () => {
    const { edit } = this.props
    const projectName = 'Testitie 27'
    const title = edit ? `${projectName}, muokkaa` : `${projectName}, hankekortti`
    return (
      <div className='project-container'>
        <Header />
        <NavHeader title={title} project={ projectName } edit={edit} actions={!edit ? this.getActions() : null} />
        <Timeline tab={ this.state.tab } changeTab={ this.changeTab } />
        { edit && <FormPage tab={ this.state.tab } inputs={ this.props.inputs } /> }
        { !edit && <SummaryPage /> }
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
    inputs: projectInputsSelector(state)
  }
}

const mapDispatchToProps = {
  requestValue,
  fetchInputs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectPage)
