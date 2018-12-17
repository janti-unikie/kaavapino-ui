import React, { Component } from 'react'
import Input from './Input'
import SelectInput from './SelectInput'
import Radio from './Radio'
import TextArea from './TextArea'
import File from './File'
import FieldSet from './FieldSet'
import { Field, FieldArray } from 'redux-form'

class CustomField extends Component {
  shouldComponentUpdate(p) {
    if (!this.props.attributeData || !p.attributeData) {
      return true
    }
    if (this.props.attributeData[this.props.field.name] !== p.attributeData[p.field.name]) {
      return true
    }
    return false
  }

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

  renderDateTime = (props) => <Input type='datetime' {...props} />

  renderDate = (props) => <Input type='date' {...props} />

  renderSelect = (props) => {
    const { choices, multiple_choice } = this.props.field
    return <SelectInput multiple={multiple_choice} options={this.formatOptions(choices)} {...props} />
  }

  renderRadio = (props) => <Radio {...props} />

  renderFieldset = ({ fields: sets }) => (
    <FieldSet
      sets={sets}
      fields={this.props.field.fieldset_attributes}
      attributeData={this.props.attributeData}
      name={this.props.field.name}
    />
  )

  getInput = (field) => {
    if (field.choices) {
      return this.renderSelect
    }

    switch (field.type) {
      case 'boolean': return this.renderRadio
      case 'string':
      case 'uuid':
      case 'short_string': return this.renderString
      case 'long_string': return this.renderTextArea
      case 'datetime': return this.renderDateTime
      case 'date': return this.renderDate
      case 'fieldset': return this.renderFieldset
      default: return this.renderNumber
    }
  }

  render() {
    const { field, attributeData, fieldset, ...custom } = this.props
    const type = field.type
    if (type === 'file' || type === 'image') {
      return <File image={type === 'image'} field={field} src={attributeData[field.name]} />
    }

    const fieldProps = {
      name: field.name,
      placeholder: field.label,
      component: this.getInput(field),
      ...custom,
      ...(field.multiple_choice ? { type: 'select-multiple' } : {})
    }

    if (fieldset) {
      return <FieldArray {...fieldProps} />
    }

    return <Field {...fieldProps} />
  }
}

export default CustomField
