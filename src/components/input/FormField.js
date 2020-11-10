import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomField from './CustomField'
import Matrix from './Matrix'
import { Form, Label, Popup } from 'semantic-ui-react'
import Info from './Info'
import projectUtils from '../../utils/projectUtils'
import { showField } from '../../utils/projectVisibilityUtils'

const OneLineFields = ['toggle']

class FormField extends Component {
  renderField = () => {
    const {
      field,
      attributeData,
      formName,
      formValues,
      isFloorCalculation,
      ...rest
    } = this.props

    switch (field.type) {
      case 'matrix':
        return (
          <Matrix
            field={field}
            isFloorCalculation={isFloorCalculation}
            attributeData={attributeData}
            formValues={formValues}
            formName={formName}
          />
        )
      default:
        return (
          <CustomField
           {...rest}
            disabled={field.disabled}
            field={field}
            attributeData={attributeData}
            fieldset={field.type === 'fieldset'}
            formName={formName}
            formValues={formValues}
            syncronousErrors={this.props.syncronousErrors}
          />
        )
    }
  }

  render() {
    const {
      field,
      attributeData,
      checking,
      updated,
      formValues,
      syncronousErrors,
      submitErrors
    } = this.props
    const required =
      checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
    const isOneLineField = OneLineFields.indexOf(field.type) > -1
    const isReadOnly = field && field.autofill_readonly
    const isCheckBox = field && field.type === 'checkbox'

    const syncError = syncronousErrors && syncronousErrors[field.name]
    let submitErrorText = ''
    if ( submitErrors && submitErrors[field.name]) {
      const submitErrorObject = submitErrors[field.name]
      submitErrorText = submitErrorObject ? submitErrorObject[field.name] : ''
    }

    const error = submitErrorText ? submitErrorText : syncError

    /* Two ways to bring errors to FormField component:
     * 1) the missing attribute data of required fields is checked automatically.
     * 2) error text can be given directly to the component as props.
     * Redux form gives error information to the Field component, but that's further down the line, and we need that information
     * here to modify the input header accordingly. */

    const showError = required ? 'pakollinen kenttä' : error
    if (!showField(field, formValues)) {
      return null
    }

    const title = field.character_limit
      ? `${field.label}  (Max ${field.character_limit} merkkiä)`
      : field.label

    const renderCheckBox = () => {
       return (
        <Form.Field
          className={`checkbox-container small-margin'} ${
          showError ? 'error' : ''
        }`}
        >
          <Label>
              <span className="checkbox">{this.renderField()}</span>
              <span>{title}</span>
          </Label>
       </Form.Field>
       )
    }

    const renderNormalField = () => {
      return (
      <Form.Field
        className={`input-container ${isOneLineField ? 'small-margin' : ''} ${
          showError ? 'error' : ''
        }`}
      >
        {!isOneLineField && (
          <div className="input-header">
            <Label className={`input-title${required ? ' highlight' : ''}`}>
              {title}
            </Label>
            <div className="input-header-icons">
              {updated && !isReadOnly && (
                <Popup
                  trigger={<FontAwesomeIcon icon="clock" />}
                  inverted
                  on="hover"
                  position="top center"
                  hideOnScroll
                  content={
                    ( <span className="input-history">
                      <span>{`${projectUtils.formatDate(
                        updated.timestamp
                      )} ${projectUtils.formatTime(updated.timestamp)} ${
                        updated.user_name
                      }`}</span>
                    </span>
                    )
                  }
                />
              )}
              {field.help_text && (
                <Info content={field.help_text} link={field.help_link} />
              )}
            </div>
          </div>
        )}
        {this.renderField()}
        {showError && <div className="error-text">{showError}</div>}
      </Form.Field>
      )
    }

   return isCheckBox ? renderCheckBox() : renderNormalField()
  }
}

export default FormField
