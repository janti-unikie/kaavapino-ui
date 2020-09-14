import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Field from './Field'
import Matrix from './Matrix'
import { Form, Label, Popup } from 'semantic-ui-react'
import Info from './Info'
import projectUtils from '../../utils/projectUtils'

const OneLineFields = ['toggle']

const handleBlurSave = (evt, handleSave) => {
  if (evt && evt.target) {
    if (evt.target._wrapperState.initialValue !== evt.target.value) {
      handleSave()
    }
  }
}

class FormField extends Component {
  renderField = () => {
    const { field, attributeData, handleSave, ...rest } = this.props
    switch (field.type) {
      case 'matrix':
        return <Matrix field={field} attributeData={attributeData} />
      default:
        return (
          <Field
            disabled={field.disabled}
            field={field}
            attributeData={attributeData}
            fieldset={field.type === 'fieldset'}
            onBlur={e => {handleBlurSave(e, handleSave)}}
            {...rest}
          />
        )
    }
  }

  render() {
    const { field, attributeData, checking, updated, error } = this.props
    const required =
      checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
    const isOneLineField = OneLineFields.indexOf(field.type) > -1

    /* Two ways to bring errors to FormField component:
     * 1) the missing attribute data of required fields is checked automatically.
     * 2) error text can be given directly to the component as props.
     * Redux form gives error information to the Field component, but that's further down the line, and we need that information
     * here to modify the input header accordingly. */
    const showError = required ? 'pakollinen kenttä' : error

    return (
      <Form.Field
        className={`input-container ${isOneLineField ? 'small-margin' : ''} ${
          showError ? 'error' : ''
        }`}
      >
        {!isOneLineField && (
          <div className="input-header">
            <Label className={`input-title${required ? ' highlight' : ''}`}>
              {field.label}
            </Label>
            <div className="input-header-icons">
              {updated && (
                <Popup
                  trigger={<FontAwesomeIcon icon="clock" />}
                  inverted
                  on="hover"
                  position="top center"
                  hideOnScroll
                  content={
                    <span className="input-history">
                      <span>{`${projectUtils.formatDate(
                        updated.timestamp
                      )} ${projectUtils.formatTime(updated.timestamp)} ${
                        updated.user_name
                      }`}</span>
                    </span>
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
}

export default FormField
