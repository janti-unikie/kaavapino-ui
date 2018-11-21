import React from 'react'
import { Form, Divider } from 'semantic-ui-react'
import FormField from './FormField'

const FormSection = ({ section: { title, fields }, checking, attributeData }) => {
  return (
    <div>
      <span id={`title-${title}`} className='form-title'>{ title }</span>
      <Divider />
      { fields.map((field, i) => {
        const required = checking && field.required && !attributeData[field.name]
        return (
          <div className='input-container' key={i}>
            <div className='input-header'>
              <Form.Field required={ required }>
                <label className={`input-title${required ? ' highlight': ''}`}>{ field.label }</label>
              </Form.Field>
            </div>
            <FormField field={field} checking={checking} attributeData={attributeData} />
          </div>
        )
      }) }
    </div>
  )
}

export default FormSection