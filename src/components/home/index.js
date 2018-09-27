import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../common/Button'
import { requestValue } from '../../actions/exampleActions'
import { exampleValueSelector } from '../../selectors/exampleSelector'
import Navbar from '../common/Navbar'

class HomePage extends Component {
  handleClick = () => this.props.requestValue()

  render = () => (
    <div>
      <Navbar />
      <p className='current-value'>{this.props.value}</p>
      <Button value='request new value' handleClick={this.handleClick} />
    </div>
  )
}

HomePage.propTypes = {
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
}

const mapStateToProps = (state) => {
  return {
    value: exampleValueSelector(state)
  }
}

const mapDispatchToProps = {
  requestValue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
