import React from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import SelectInput from '../input/SelectInput'
import { TextInput } from 'hds-react'
import { REPORT_FORM } from '../../constants'

function FilterField(props) {
  const { type, id, options, change } = props

  const renderSelect = () => {
    return (
      <SelectInput
        multiple={type === 'multiple' ? true : false}
        options={options}
        className="filter-field"
        input={{
          value: [],
          onChange: value => change(REPORT_FORM, id, value)
        }}
      />
    )
  }

  const renderTextInput = () => {

    let currentType
    if ( type === 'string') {
      currentType = 'text'
    }
    if ( type === 'number') {
      currentType = 'number'
    }


    return (
      <TextInput
        onChange={event => {
          change(REPORT_FORM, id, event.target.value)
        }}
        type={currentType }
        input={{
          value: null
        }}
      />
    )
  }

  const renderComponent = () => {
    if (options && options.length > 0) {
      return renderSelect()
    }

    return renderTextInput()
  }

  return renderComponent()
}

const mapDispatchToProps = {
  change
}

export default connect(null, mapDispatchToProps)(FilterField)
