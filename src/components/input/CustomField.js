import React, { Component } from 'react'
import CustomInput from './CustomInput'
import DeadLineInput from './DeadlineInput'
import SelectInput from './SelectInput'
import BooleanRadio from './RadioBooleanButton'
import CustomTextArea from './CustomTextArea'
import File from './File'
import FieldSet from './FieldSet'
import Geometry from './Geometry'
import Link from './Link'
import DateTime from './DateTime'
import { Field, FieldArray } from 'redux-form'
import CustomRadioButton from './CustomRadioButton'
import ToggleButton from './ToggleButton'
import RichTextEditor from '../RichTextEditor'
import OnHoldCheckbox from './OnholdCheckbox'
import DeadlineCheckbox from './DeadlineCheckbox'

import AutofillInputCalculations from './AutofillInputCalculation/AutofillInputCalculations'

import { isEqual } from 'lodash'
import projectUtils from '../../utils/projectUtils'
import AutofillInput from './AutofillInput/AutofillInput'
import _ from 'lodash'
import DeadlineInfoText from './DeadlineInfoText'
class CustomField extends Component {
  yearOptions = []
  shouldComponentUpdate(p) {
    if (
      !this.props.attributeData ||
      !p.attributeData ||
      !_.isEqual(this.props.attributeData, p.attributeData)
    ) {
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

    /*This is for adding fieldsets  */
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
    if (value && field && field.character_limit && field.character_limit > 0) {
      if (value.length > field.character_limit) {
        return 'Kentässä liikaa merkkejä'
      }
    }
  }

  formatOptions = options => {
    return options.map(option => {
      return {
        key: option.value,
        value: option.value,
        label: option.label
      }
    })
  }

  renderNumber = props => {
    const { onBlur } = this.props

    return <CustomInput onBlur={onBlur} {...props} type="number" />
  }

  renderYearSelect = props => {
    const { multiple_choice, placeholder_text } = this.props.field
    const { onBlur, formName } = this.props

    if (this.yearOptions.length === 0) {
      this.yearOptions = projectUtils.generateArrayOfYears()
    }
    return (
      <SelectInput
        multiple={multiple_choice}
        options={this.yearOptions}
        onBlur={onBlur}
        formName={formName}
        placeholder={placeholder_text}
        {...props}
      />
    )
  }

  renderString = props => {
    const { onBlur } = this.props
    return <CustomInput onBlur={onBlur} type="text" {...props} />
  }

  renderTextArea = props => {
    const { onBlur } = this.props
    return <CustomTextArea onBlur={onBlur} {...props} />
  }

  renderRichText = props => {
    const { onBlur, meta } = this.props
    return <RichTextEditor onBlur={onBlur} meta={meta} {...props} largeField />
  }

  renderRichTextShort = props => {
    const { onBlur, meta } = this.props
    return (
      <RichTextEditor onBlur={onBlur} meta={meta} {...props} />
    )
  }

  renderDate = props => {
    const { onBlur, deadlines, field } = this.props

    let current
    if (deadlines && deadlines.length > 0) {
      current = deadlines.find(
        deadline => deadline.deadline.attribute === props.input.name
      )
    }

    if (deadlines && deadlines.length > 0) {
      return (
        <DeadLineInput
          type="date"
          editable={field.editable}
          currentDeadline={current}
          {...props}
        />
      )
    }
    return <CustomInput onBlur={onBlur} type="date" {...props} />
  }

  renderGeometry = props => {
    const { attributeData, onBlur } = this.props
    return <Geometry onBlur={onBlur} attributeData={attributeData} {...props} />
  }

  renderSelect = props => {
    const { choices, multiple_choice, placeholder_text, formName } = this.props.field
    const { onBlur } = this.props

    return (
      <SelectInput
        {...props}
        multiple={multiple_choice}
        options={this.formatOptions(choices)}
        onBlur={onBlur}
        placeholder={placeholder_text}
        formName={formName}
      />
    )
  }

  renderRadio = props => {
    const { field, onBlur } = this.props
    return <CustomRadioButton options={this.formatOptions(field.options)} onBlur={onBlur} {...props} />
  }

  renderBooleanRadio = props => {
    const { input, onRadioChange, defaultValue } = this.props
    return (
      <BooleanRadio
        onBlur={props.onBlur}
        input={input}
        onRadioChange={onRadioChange}
        defaultValue={defaultValue}
        {...props}
      />
    )
  }

  renderToggle = props => {
    const { onBlur } = this.props
    return <ToggleButton onBlur={onBlur} {...props} />
  }

  renderLink = props => {
    const { onBlur } = this.props
    const { placeholder_text } = this.props.field

    return <Link onBlur={onBlur} placeholder={placeholder_text} {...props} />
  }

  renderDateTime = props => {
    const { onBlur, handleSave } = this.props
    return <DateTime onBlur={onBlur} handleSave={handleSave} {...props} />
  }

  renderFieldset = ({ fields: sets }) => {
    const {
      field: {
        fieldset_attributes,
        name,
        label,
        generated,
        disabled,
        autofill_readonly,
        editable
      },
      field,
      attributeData,
      formValues,
      syncronousErrors,
      handleSave,
      onRadioChange,
      placeholder,
      formName,
      updated
    } = this.props

    return (
      <FieldSet
        sets={sets}
        fields={fieldset_attributes}
        attributeData={attributeData}
        name={name}
        placeholder={placeholder || label}
        disabled={generated || disabled || autofill_readonly || !editable}
        formValues={formValues}
        validate={[this.validateFieldSize]}
        syncronousErrors={syncronousErrors}
        handleSave={handleSave}
        onRadioChange={onRadioChange}
        field={field}
        formName={formName}
        updated={updated}
      />
    )
  }

  renderDecimal = props => {
    const { onBlur } = this.props
    return <CustomInput type="number" step="0.01" onBlur={onBlur} {...props} />
  }

  renderDeadlineCheckbox = props => {
    const { field } = this.props
    return (
      <DeadlineCheckbox
        {...props}
        label={field.label}
        autofillRule={field.autofill_rule}
      />
    )
  }

  renderOnholdCheckbox = props => {
    const { onhold, saveProjectBase, disabled } = this.props
    return (
      <OnHoldCheckbox
       {...props}
        projectOnhold={onhold}
        saveProjectBase={saveProjectBase}
        disabled={disabled}
      />
    )
  }
  renderDeadlineInfo = props => {
    const { field, deadlines } = this.props

    projectUtils.checkDeadline(props, deadlines)

    return (
      <DeadlineInfoText
        label={field.label}
        autofillRule={field.autofill_rule}
        {...props}
      />
    )
  }

  getInput = field => {
    // Since there might be rules which has boolean type and choices, avoid selecting select and select
    // boolean radiobutton intead
    if (field.choices && field.type !== 'boolean') {
      /* Should perhaps check (field.type === 'select' && field.choices), but there were tests against it.
      Will get back to this. */
      return this.renderSelect
    }
    if (field.display === 'dropdown') {
      return this.renderYearSelect
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
      case 'checkbox-onhold':
        return this.renderOnholdCheckbox
      case 'checkbox':
        return this.renderDeadlineCheckbox
      case 'readonly':
        return this.renderDeadlineInfo
      default:
        return this.renderNumber
    }
  }

  render() {
    const {
      field,
      attributeData,
      fieldset,
      formName,
      formValues,
      error,
      updated,
      defaultValue,
      className
    } = this.props
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
          attributeData={attributeData}
        />
      )
    }

    const showFieldClass = field.display === 'hidden' ? 'hidden' : className

    const placeHolderText = field.placeholder_text
      ? field.placeholder_text.trim()
      : field.label

    let fieldProps = {
      name: field.name,
      placeholder: placeHolderText,
      disabled:
        field.generated || field.disabled || field.autofill_readonly || !field.editable,
      component: this.getInput(field),
      ...(field.multiple_choice ? { type: 'select-multiple' } : {}),
      updated: { updated },
      className: `${className ? className : ''} ${showFieldClass ? showFieldClass : ''}`
    }

    /* Some fields are autofilled to a value as per (autofill_rules)
     * Some fields have their value calculated based on other fields (calculations)
     * Some autofill fields are readonly, some are not (autofill_readonly) */
    if (this.props.isFloorCalculation) {
      fieldProps = {
        ...fieldProps,
        parse:
          field.type === 'integer'
            ? val => (val || val === 0 ? Number(val) : null)
            : null,
        disabled: field.generated || !field.editable
      }
      return (
        <AutofillInputCalculations
          field={field}
          fieldProps={fieldProps}
          formName={formName}
        />
      )
    }
    if (field.autofill_rule && field.display !== 'readonly') {
      return <AutofillInput field={field} fieldProps={fieldProps} formName={formName} />
    }

    if (type === 'toggle') {
      return (
        <Field
          {...fieldProps}
          label={field.label}
          attributeData={this.props.attributeData}
        />
      )
    }

    if (type === 'rich_text' || type === 'rich_text_short') {
      // Fieldsets have calculated defaultValues
      let currentDefaultValue = defaultValue

      // Non-fieldset fields get defaultValue from attributeData
      if (!defaultValue)
        currentDefaultValue = attributeData ? attributeData[field.name] : null
      return (
        <Field
          {...fieldProps}
          defaultValue={currentDefaultValue}
          formName={formName}
          className={`${this.props.className} ${error ? error : ''}`}
          maxSize={field.character_limit}
          attributeData={this.props.attributeData}
        />
      )
    }

    if (fieldset) {
      const newProps = {
        ...fieldProps,
        type: 'fieldset'
      }
      return <FieldArray component={this.renderFieldset} {...newProps} />
    }

    return (
      <Field
        {...fieldProps}
        validate={[this.validateFieldSize]}
        className={`${this.props.className} ${error ? error : ''}`}
      />
    )
  }
}

export default CustomField
