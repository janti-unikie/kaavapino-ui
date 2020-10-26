import React, { Component } from 'react'
import Input from './Input'
import SelectInput from './SelectInput'
import BooleanRadio from './RadioBooleanButton'
import TextArea from './TextArea'
import File from './File'
import FieldSet from './FieldSet'
import Geometry from './Geometry'
import Link from './Link'
import DateTime from './DateTime'
import { Field, FieldArray, formValues } from 'redux-form'
import RadioButton from './RadioButton'
import ToggleButton from './ToggleButton'
import RichTextEditor from '../RichTextEditor'
import OnHoldCheckbox from './OnholdCheckbox'
import AutofillInputCalculations from './AutofillInputCalculation/AutofillInputCalculations'

import { isEqual } from 'lodash'
import projectUtils from '../../utils/projectUtils'
import AutofillInput from './AutofillInput/AutofillInput'
class CustomField extends Component {

  yearOptions = []
  shouldComponentUpdate(p) {
    if (!this.props.attributeData || !p.attributeData) {
      return true
    }

    if (this.props.field.disabled !== p.field.disabled) {
      return true
    }
    if (this.props.field.generated !== p.field.generated) {
      return true
    }
    if (this.props.field.autofill_readOnly !== p.field.autofill_readOnly) {
      return true
    }

    if (
      !isEqual(
        this.props.attributeData[this.props.field.name],
        p.attributeData[p.field.name]
      )
    ) {
      return true
    }

    /* Render again when a related field changes */
    if (this.props.field.related_fields && this.props.field.related_fields.length > 0) {
      const relatedFields = this.props.field.related_fields
      for (let i = 0; i < relatedFields.length; i += 1) {
        if (
          !isEqual(
            this.props.attributeData[relatedFields[i]],
            p.attributeData[relatedFields[i]]
          )
        ) {
          return true
        }
      }
    }
    return false
  }
  validateFieldSize = value => {
    const field = this.props.field
    if ( value && field && field.character_limit && field.character_limit > 0 ) {
        if ( value.length > field.character_limit ) {
          return 'Kentässä liikaa merkkejä'
        }
    }
  }

  formatOptions = options => {
    return options.map(option => {
      return {
        key: option.value,
        value: option.value,
        text: option.label
      }
    })
  }

  renderNumber = props => {
    projectUtils.checkInputValue(props)
    return <Input type="number" {...props} />
  }

  renderYearSelect = props => {
      const { multiple_choice } = this.props.field

      if ( this.yearOptions.length === 0 ) {
        this.yearOptions = projectUtils.generateArrayOfYears()
      }
      return (
        <SelectInput
          multiple={multiple_choice}
          options={this.formatOptions(this.yearOptions)}
          {...props}
        />
     )
  }

  renderString = props => {
    if(props.defaultValue) {
      props.input.defaultValue = props.defaultValue
      delete props.input.value
    }
    return <Input type="text" {...props}  />
  }

  renderTextArea = props => {
    projectUtils.checkInputValue(props)
    return <TextArea {...props}/>
  }

  renderRichText = props => {
    projectUtils.checkInputValue(props)
    return <RichTextEditor {...props} largeField />
  }

  renderRichTextShort = props => {
    projectUtils.checkInputValue(props)
    return <RichTextEditor {...props} />
  }

  renderDate = props => {
    projectUtils.checkInputValue(props)
    return <Input type="date" {...props} />
  }

  renderGeometry = props => {
    projectUtils.checkInputValue(props)
    return <Geometry {...props} />
  }

  renderSelect = props => {
    const { choices, multiple_choice } = this.props.field
    return (
      <SelectInput
        multiple={multiple_choice}
        options={this.formatOptions(choices)}
        {...props}
      />
    )
  }

  renderRadio = props => {
    const { options } = this.props.field
    return <RadioButton options={options} {...props} />
  }

  renderBooleanRadio = props => {
    projectUtils.checkInputValue(props)
    return <BooleanRadio {...props} />
  }

  renderToggle = props => {
    projectUtils.checkInputValue(props)
    return <ToggleButton {...props} />
  }

  renderLink = props => {
    projectUtils.checkInputValue(props)
    return <Link {...props} />
  }

  renderDateTime = props => {
    projectUtils.checkInputValue(props)
    return <DateTime {...props} />
  }

  renderFieldset = ({ fields: sets }) => (
    <FieldSet
      sets={sets}
      fields={this.props.field.fieldset_attributes}
      disabled={this.props.field.disabled}
      attributeData={this.props.attributeData}
      name={this.props.field.name}
      formValues={formValues}
      validate={[this.validateFieldSize]}
      syncronousErrors={this.props.syncronousErrors}
    />
  )

  renderDecimal = props => {
    projectUtils.checkInputValue(props)
    return <Input type="number" step="0.01" {...props} />
  }

  renderCheckbox = props => {
    const { onhold, saveProjectBase, disabled } = this.props.field
    return <OnHoldCheckbox onhold={onhold} saveProjectBase={saveProjectBase} disabled={disabled} {...props} />
  }

  getInput = field => {
   if (field.choices) {
      /* Should perhaps check (field.type === 'select' && field.choices), but there were tests against it.
      Will get back to this. */
      return this.renderSelect
    }
    if ( field.display === 'dropdown') {
      return  this.renderYearSelect
    }

    if (field.type === 'radio' && field.options) {
      return this.renderRadio
    }
    switch (field.type) {
      case 'boolean':
        return this.renderBooleanRadio
      case 'toggle':
        return this.renderToggle
      case 'string':
      case 'text':
      case 'uuid':
      case 'short_string':
        return this.renderString
      case 'long_string':
        return this.renderTextArea
      case 'rich_text':
        return this.renderRichText
      case 'rich_text_short':
        return this.renderRichTextShort
      case 'datetime':
        return this.renderDateTime
      case 'date':
        return this.renderDate
      case 'fieldset':
        return this.renderFieldset
      case 'geometry':
        return this.renderGeometry
      case 'link':
        return this.renderLink
      case 'decimal':
        return this.renderDecimal
      case 'checkbox':
        return this.renderCheckbox
      default:
        return this.renderNumber
    }
  }

  render() {
    const { field, attributeData, fieldset, formName, formValues, error, ...custom } = this.props

    const type = field.type
    if (type === 'file' || type === 'image') {
      const file = attributeData[field.name]
      const src = file ? file.link : null
      const description = file ? file.description : null
      return (
        <File
          image={type === 'image'}
          field={field}
          src={src}
          description={description}
          formValues={formValues}
        />
      )
    }
    let fieldProps = {
      name: field.name,
      placeholder: field.placeholder || field.label,
      component: this.getInput(field),
      ...custom,
      ...(field.multiple_choice ? { type: 'select-multiple' } : {}),
      disabled: field.generated || field.disabled || field.autofill_readonly ? true : false,
      attributeData
    }

    /* Some fields are autofilled to a value as per (autofill_rules)
     * Some fields have their value calculated based on other fields (calculations)
     * Some autofill fields are readonly, some are not (autofill_readonly) */
    if( this.props.isFloorCalculation ) {
      fieldProps = {
        ...fieldProps,
        parse: field.type === 'integer' ? val => (val || val === 0 ? Number(val) : null) : null
      }
      return <AutofillInputCalculations field={field} fieldProps={fieldProps} formName={formName} />
    }
    if (field.autofill_rule && field.autofill_rule.length && !this.props.isFloorCalculation) {
      return <AutofillInput field={field} fieldProps={fieldProps} formName={formName} />
    }

    if (type === 'toggle') {
      return <Field {...fieldProps} label={field.label} />
    }

    if (type === 'rich_text' || type === 'rich_text_short') {
      // Fieldsets have calculated defaultValues
      let defaultValue = fieldProps.defaultValue
      // Non-fieldset fields get defaultValue from attributeData
      if (!defaultValue) defaultValue = (attributeData ? attributeData[field.name] : null)
      return (
        <Field
          {...fieldProps}
          defaultValue={defaultValue}
          formName={formName}
          className={`${this.props.className} ${ error ? error : ''}`}
          maxSize={field.character_limit}
        />
      )
    }

    if (fieldset) {
      return <FieldArray {...fieldProps} />
    }

    return (
      <Field
        {...fieldProps}
        validate={[this.validateFieldSize]}
        className={`${this.props.className} ${ error ? error : ''}`}
       />
    )
  }
}

export default CustomField
