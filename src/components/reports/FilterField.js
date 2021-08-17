import React from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import CustomField from '../input/CustomField'

function FilterField(props) {
  const { type, id, selectedOption } = props

  return (
    <CustomField
      onChange={ value => props.change('reportForm', `${id}__${selectedOption}`, value)}
      className="filter-field"
      field={{ type, name: `${id}__${selectedOption}`, editable: true }}
    />
  )
}

const mapDispatchToProps = {
  change
}

export default connect(null, mapDispatchToProps)(FilterField)
