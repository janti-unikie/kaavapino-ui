import React from 'react'
import { Form, Divider } from 'semantic-ui-react'
import Info from '../input/Info'
import FormField from './FormField'
import projectUtils from '../../utils/projectUtils'

const FormSection = ({ section: { title, fields }, checking, attributeData }) => {
  return (
    <div>
      <span id={`title-${title}`} className='form-title'>{ title }</span>
      <Divider />
      { fields.map((field, i) => {
        const required = checking && projectUtils.isFieldMissing(field.name, field.required, attributeData)
        return (
          <div className='input-container' key={i}>
            <Form.Field required={ required } className='input-header'>
              <label className={`input-title${required ? ' highlight': ''}`}>{ field.label }</label>
              { field.help_text && <Info content={field.help_text} /> }
            </Form.Field>
            <FormField field={field} attributeData={attributeData} />
          </div>
        )
      }) }
    </div>
  )
}

export default FormSection