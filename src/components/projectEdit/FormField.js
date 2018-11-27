import React from 'react'
import Field from '../input/Field'
import Matrix from '../input/Matrix'

const FormField = ({ field, attributeData }) => {
  switch (field.type) {
    case 'matrix': return <Matrix field={field} attributeData={attributeData} />
    default: return <Field  field={field} attributeData={attributeData} fieldset={field.type === 'fieldset'} />
  }
}

export default FormField