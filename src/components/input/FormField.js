import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Field from './Field'
import Matrix from './Matrix'
import { Form, Label, Popup } from 'semantic-ui-react'
import Info from './Info'
import projectUtils from '../../utils/projectUtils'

const OneLineFields = ['toggle']

class FormField extends Component {
  renderField = () => {
    const { field, attributeData } = this.props

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
          />
        )
    }
  }

  render() {
    const { field, attributeData, checking, updated } = this.props
    const required =
      checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
    const isOneLineField = OneLineFields.indexOf(field.type) > -1

    return (
      <Form.Field className={`input-container ${isOneLineField ? 'small-margin' : ''}`}>
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
      </Form.Field>
    )
  }
}

export default FormField
