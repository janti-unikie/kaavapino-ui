import React from 'react'
import { Form } from 'semantic-ui-react'
import Field from '../input/Field'
import Matrix from '../input/Matrix'

const FormSection = ({ section: { title, fields }, checking, attributeData }) => {
  return (
    <div>
      <span id={`title-${title}`} className='form-title'>{ title }</span>
      <hr />
      { fields.map((field, i) => {
        const required = checking && field.required && !attributeData[field.name]
        return (
          <div className='input-container' key={i}>
            <div className='input-header'>
              <Form.Field required={ required }>
                <label className={`input-title${required ? ' highlight': ''}`}>{ field.label }</label>
              </Form.Field>
            </div>
            { field.type === 'matrix' && <Matrix field={field} checking={checking} attributeData={attributeData} /> }
            { field.type !== 'matrix' && <Field field={field} /> }
          </div>
        )
      }) }
    </div>
  )
}

export default FormSection