import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import FormSection from './FormSection'

class EditForm extends Component {
  componentDidMount() {
    /* this.props.initialize({ name: '123' }) */
  }

  render() {
    const { sections } = this.props
    return (
      <Form className='form-container'>
        { sections.map((section, i) => <FormSection key={i} section={section} /> ) }
      </Form>
    )
  }
}

export default reduxForm({
  form: 'EditForm'
})(EditForm)