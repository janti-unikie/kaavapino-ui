import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import FormSection from './FormSection'

class EditForm extends Component {
  componentDidMount() {
    /* this.props.initialize({
      kaavan_hyvaksyjataho: 'foo',
      asuminen_kerrostalo_uusi_k_m2muut: 20,
      uutta_tai_siirrettavaa_infraa: true,
      kaavan_valmistelijan_nimi: ['1']
    }) */
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