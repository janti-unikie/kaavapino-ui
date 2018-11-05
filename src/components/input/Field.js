import React, { Component } from 'react'
import Input from './Input'
import SelectInput from './SelectInput'
import Radio from './Radio'
import TextArea from './TextArea'
import { Field } from 'redux-form'

class CustomField extends Component {
  formatOptions = (options) => {
    return options.map((option) => {
      return {
        key: option.value,
        value: option.value,
        text: option.label
      }
    })
  }

  renderNumber = (props) => <Input type='number' {...props} />

  renderString = (props) => <Input type='text' {...props} />

  renderTextArea = (props) => <TextArea {...props} />

  renderDate = (props) => <Input type='date' {...props} />

  renderSelect = (props) => {
    const { choices, multiple_choice } = this.props.field
    return <SelectInput multiple={multiple_choice} options={this.formatOptions(choices)} {...props} />
  }

  renderRadio = (props) => <Radio {...props} />

  getInput = (field) => {
    if (field.choices) {
      return this.renderSelect
    }

    switch (field.type) {
      case 'boolean': return this.renderRadio
      case 'short_string': return this.renderString
      case 'long_string': return this.renderTextArea
      case 'date': return this.renderDate
      default: return this.renderNumber
    }
  }

  render() {
    const { field } = this.props
    const fieldProps = {
      name: field.name,
      component: this.getInput(field),
      ...(field.multiple_choice ? { type: 'select-multiple' } : {})
    }
    return <Field {...fieldProps} />
  }
}

export default CustomField
