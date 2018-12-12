import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Field from '../input/Field'
import Matrix from '../input/Matrix'
import { Form } from 'semantic-ui-react'
import Info from '../input/Info'
import projectUtils from '../../utils/projectUtils'

class FormField extends Component {
  state = {
    showHistory: false
  }

  handleMouseEnter = () => this.setState({ showHistory: true })

  handleMouseLeave = () => this.setState({ showHistory: false })

  renderField = () => {
    const { field, attributeData } = this.props
    switch (field.type) {
      case 'matrix': return <Matrix field={field} attributeData={attributeData} />
      default: return <Field  field={field} attributeData={attributeData} fieldset={field.type === 'fieldset'} />
    }
  }

  render() {
    const { field, attributeData, checking, updated } = this.props
    const { showHistory } = this.state
    const required = checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
    return (
      <div className='input-container' onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Form.Field required={ required } className='input-header'>
          <label className={`input-title${required ? ' highlight': ''}`}>{ field.label }</label>
          { field.help_text && <Info content={field.help_text} /> }
          { showHistory && updated && (
            <span className='input-history'>
              <FontAwesomeIcon icon='clock'/>
              <span>{`${projectUtils.formatDate(updated.timestamp)} ${projectUtils.formatTime(updated.timestamp)} ${updated.user_name}`}</span>
            </span>
          )}
        </Form.Field>
        { this.renderField() }
      </div>
    )
  }
}

export default FormField