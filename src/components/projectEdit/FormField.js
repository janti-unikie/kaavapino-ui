import React from 'react'
import Field from '../input/Field'
import Matrix from '../input/Matrix'
import File from '../input/File'

const FormField = ({ field, checking, attributeData }) => {
  switch (field.type) {
    case 'matrix': return <Matrix field={field} checking={checking} attributeData={attributeData} />
    case 'image': return <File image field={field} src={attributeData[field.name]} />
    case 'file': return <File field={field} />
    default: return <Field field={field} />
  }
}

export default FormField