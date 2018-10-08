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
import Form from './Form'
import QuickNav from './QuickNav'
import CommentList from './CommentList'

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

  render = () => {
    return (
      <div className='project-container'>
        <Header />
        <NavHeader />
        <Timeline tab={ this.state.tab } changeTab={ this.changeTab } />
        <div className='project-input-container'>
          <Form inputs={ this.props.inputs } tab={ this.state.tab } />
          <div className='project-input-right'>
            <QuickNav inputs={ this.props.inputs } />
            <CommentList />
          </div>
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
