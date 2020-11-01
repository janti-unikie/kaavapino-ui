import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import CustomField from '../input/CustomField'

class FilterField extends Component {
  componentWillUnmount() {
    const { id, selectedOption } = this.props
    this.props.change('reportForm', `${id}__${selectedOption}`, '')
  }

  render() {
    const { type, id, selectedOption } = this.props
    return <CustomField field={{ type, name: `${id}__${selectedOption}` }} />
  }
}

const mapDispatchToProps = {
  change
}

export default connect(null, mapDispatchToProps)(FilterField)
