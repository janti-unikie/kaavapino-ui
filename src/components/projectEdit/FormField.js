import React from 'react'
import Field from '../input/Field'
import Matrix from '../input/Matrix'
import FieldSet from '../input/FieldSet'

const FormField = ({ field, checking, attributeData }) => {
  switch (field.type) {
    case 'matrix': return <Matrix field={field} checking={checking} attributeData={attributeData} />
    case 'fieldset': return <FieldSet field={field} checking={checking} attributeData={attributeData} />
    default: return <Field field={field} attributeData={attributeData} />
  }
}

export default FormField