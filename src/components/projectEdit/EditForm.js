import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormSection from './FormSection'
import Button from '../common/Button'

class EditForm extends Component {
  componentDidMount() {
    const { initialize, attributeData } = this.props
    initialize(attributeData)
  }

  handleClick = () => {
    this.props.handleSave()
  }

  render() {
    const { sections, saving } = this.props
    return (
      <Form className='form-container'>
        { sections.map((section, i) => <FormSection key={i} section={section} /> ) }
        <Button
          handleClick={this.handleClick}
          value='Tallenna'
          icon={<FontAwesomeIcon icon='check' />}
          loading={saving}
        />
      </Form>
    )
  }
}

export default reduxForm({
  form: 'editForm'
})(EditForm)