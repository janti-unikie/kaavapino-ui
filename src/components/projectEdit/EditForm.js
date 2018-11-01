import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { reduxForm/* , Field */ } from 'redux-form'

class EditForm extends Component {
  componentDidMount() {
    /* this.props.initialize({ name: '123' }) */
  }

  render() {
    const { sections } = this.props
    return (
      <Form className='form-container'>
        { sections.map(({ title, fields }, i) => {
          return (
            <div key={i}>
              <span id={`title-${title}`} className='form-title'>{ title }</span>
              <hr />
              { fields.map((field, i) => <div key={i}>{ field.label }</div>) }
            </div>
          )
        }) }
      </Form>
    )
  }
}

export default reduxForm({
  form: 'EditForm'
})(EditForm)